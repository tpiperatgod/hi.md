const test = require("node:test");
const assert = require("node:assert/strict");

function loadTts() {
  delete require.cache[require.resolve("../tts.js")];
  return require("../tts.js");
}

test("TTS_MODEL defaults to qwen3-tts-instruct-flash", () => {
  delete process.env.TTS_MODEL;
  const { getTtsModel } = loadTts();
  assert.equal(getTtsModel(), "qwen3-tts-instruct-flash");
});

test("buildTtsApiUrl derives from DASHSCOPE_BASE_URL host", () => {
  process.env.DASHSCOPE_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const { buildTtsApiUrl } = loadTts();
  assert.equal(
    buildTtsApiUrl(),
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
  );
  delete process.env.DASHSCOPE_BASE_URL;
});

test("buildSynthesisPayload uses instructions-based control", () => {
  const { buildSynthesisPayload } = loadTts();
  assert.deepEqual(buildSynthesisPayload("你好", {
    voice: "Cherry",
    instructions: "温柔、放松、像在安慰朋友",
    optimize_instructions: true,
  }), {
    model: "qwen3-tts-instruct-flash",
    input: {
      text: "你好",
      voice: "Cherry",
      instructions: "温柔、放松、像在安慰朋友",
      optimize_instructions: true,
      language_type: "Auto",
    },
  });
});
