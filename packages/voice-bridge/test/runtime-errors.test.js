const test = require("node:test");
const assert = require("node:assert/strict");

test("synthesize fails with explicit DASHSCOPE_API_KEY guidance", async () => {
  delete process.env.DASHSCOPE_API_KEY;
  // Clear require cache so the module re-evaluates without the key
  delete require.cache[require.resolve("../tts.js")];
  const { synthesize } = require("../tts.js");
  await assert.rejects(() => synthesize("hello"), /DASHSCOPE_API_KEY/);
});

test("synthesize rejects text over 600 characters", async () => {
  process.env.DASHSCOPE_API_KEY = "test-key";
  delete require.cache[require.resolve("../tts.js")];
  const { synthesize } = require("../tts.js");
  const longText = "a".repeat(601);
  await assert.rejects(() => synthesize(longText), /too long|600/i);
  delete process.env.DASHSCOPE_API_KEY;
});

test("missing binary produces an actionable install hint", () => {
  const { assertCommandAvailable } = require("../system-deps.js");
  assert.throws(
    () => assertCommandAvailable("definitely-missing-binary", "brew install ffmpeg"),
    /brew install ffmpeg/
  );
});
