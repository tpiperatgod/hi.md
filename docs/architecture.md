# Architecture

## Rust workspace

| Crate | Purpose |
|-------|---------|
| `himd-core` | Types, providers (Qwen Omni/TTS), capture, acoustic analysis |
| `himd-audio` | Native audio: cpal capture, rodio playback, VAD, WAV writing |
| `himd-mcp` | MCP server with 5 tool registrations |
| `himd-cli` | Binary entrypoint (`himd serve-stdio`, `himd doctor`) |

## MCP tools

1. **`audio_capture_once`** — Record from mic with VAD-based auto-stop
2. **`audio_analyze`** — Transcript + emotion/intent/tone/summary via Qwen Omni
3. **`audio_transcribe`** — Transcript only
4. **`speech_say`** — TTS synthesis + playback
5. **`speech_set_profile`** — Persist default voice/instructions

## Audio understanding

Single provider: Qwen Omni via DashScope streaming SSE. Returns transcript + emotion + intent + tone + summary.

## TTS

Qwen TTS via DashScope. Supports voice name, natural-language speaking instructions, and instruction optimization. Max 600 chars per request.

## Key environment variables

| Variable | Purpose |
|----------|---------|
| `DASHSCOPE_API_KEY` | DashScope API access (required) |
| `AUDIO_MODEL` | Audio understanding model (default `qwen3-omni-flash`) |
| `TTS_MODEL` | Speech synthesis model (default `qwen3-tts-instruct-flash`) |
| `DASHSCOPE_BASE_URL` | DashScope API base URL |
| `QWEN_OMNI_DEBUG` | Set `true` for debug logging |

## Limitations

- Audio: max 25 MB, max 30s, `.wav` and `.mp3` only
- TTS text max 600 chars
- macOS: native audio via `cpal` + `rodio` (no external dependencies)
- Windows: native audio via `cpal` (WASAPI) + `rodio` (no external dependencies)
