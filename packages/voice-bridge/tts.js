const fs = require("fs");
const { execSync } = require("child_process");
const { assertCommandAvailable } = require("./system-deps.js");

const PROFILE_PATH = "/tmp/himd-voice-profile.json";
const MARKER_PATH = "/tmp/himd-last-speech-turn";

const DEFAULT_PROFILE = {
  voice: "Cherry",
  instructions: "",
  optimize_instructions: false,
};

function getTtsModel() {
  return process.env.TTS_MODEL || "qwen3-tts-instruct-flash";
}

function buildTtsApiUrl() {
  const base = process.env.DASHSCOPE_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const url = new URL(base);
  return `${url.origin}/api/v1/services/aigc/multimodal-generation/generation`;
}

function buildSynthesisPayload(text, profile) {
  return {
    model: getTtsModel(),
    input: {
      text,
      voice: profile.voice || "Cherry",
      instructions: profile.instructions,
      optimize_instructions: profile.optimize_instructions ?? false,
      language_type: "Auto",
    },
  };
}

function readProfile() {
  try {
    const data = fs.readFileSync(PROFILE_PATH, "utf-8");
    return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

function writeProfile(updates) {
  const current = readProfile();
  if (updates.voice !== undefined) {
    current.voice = updates.voice;
  }
  if (updates.instructions !== undefined) {
    current.instructions = updates.instructions;
  }
  if (updates.optimize_instructions !== undefined) {
    current.optimize_instructions = updates.optimize_instructions;
  }
  current.updated_at = new Date().toISOString();
  fs.writeFileSync(PROFILE_PATH, JSON.stringify(current, null, 2));
  return current;
}

async function synthesize(text, options = {}) {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    throw new Error("DASHSCOPE_API_KEY environment variable is not set");
  }
  if (!text || text.trim().length === 0) {
    throw new Error("Text is required for TTS");
  }
  if (text.length > 600) {
    throw new Error(`Text too long: ${text.length} chars (max 600)`);
  }

  const profile = readProfile();
  const effective = {
    voice: options.voice || profile.voice,
    instructions: options.instructions !== undefined ? options.instructions : profile.instructions,
    optimize_instructions: options.optimize_instructions !== undefined ? options.optimize_instructions : profile.optimize_instructions,
  };

  const payload = buildSynthesisPayload(text, effective);

  const response = await fetch(buildTtsApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`TTS API error (${response.status}): ${errBody}`);
  }

  const result = await response.json();

  const audioUrl = result?.output?.audio?.url;
  if (!audioUrl) {
    throw new Error("TTS API did not return an audio URL");
  }

  // Download the audio file
  const audioResponse = await fetch(audioUrl);
  if (!audioResponse.ok) {
    throw new Error(`Failed to download audio (${audioResponse.status})`);
  }

  const timestamp = Date.now();
  const audioFile = buildAudioFilePath(timestamp);

  const arrayBuffer = await audioResponse.arrayBuffer();
  fs.writeFileSync(audioFile, Buffer.from(arrayBuffer));

  return {
    audioFile,
    model: getTtsModel(),
    voice: effective.voice,
    instructions: effective.instructions || null,
    optimizeInstructions: effective.optimize_instructions ?? false,
    textLength: text.length,
  };
}

function playAudio(audioFile) {
  assertCommandAvailable("afplay", "macOS includes afplay by default; confirm Command Line Tools and audio playback support with: xcode-select --install");
  try {
    execSync(`afplay "${audioFile}"`, { timeout: 30000 });
    return true;
  } catch (err) {
    return false;
  }
}

function markSpeechTurn() {
  fs.writeFileSync(MARKER_PATH, Date.now().toString());
}

function checkRecentSpeech(maxAgeMs = 60000) {
  try {
    const ts = parseInt(fs.readFileSync(MARKER_PATH, "utf-8"), 10);
    return Date.now() - ts < maxAgeMs;
  } catch {
    return false;
  }
}

function buildAudioFilePath(timestamp = Date.now()) {
  return `/tmp/himd-tts-${timestamp}.wav`;
}

module.exports = {
  synthesize,
  playAudio,
  markSpeechTurn,
  checkRecentSpeech,
  readProfile,
  writeProfile,
  getTtsModel,
  buildTtsApiUrl,
  buildSynthesisPayload,
  PROFILE_PATH,
  MARKER_PATH,
  buildAudioFilePath,
};
