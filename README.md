# hi.md

hi.md is a voice-first `/hi` companion for Claude Code.

Type `/hi`, speak naturally, and hi.md will capture your voice, analyze both your words and vocal signals, generate a warm reply, and speak it aloud.

Instead of `speech → text → response`, hi.md moves closer to `speech → understanding (content + state) → interaction`.

## Quick start

1. Install the plugin in Claude Code:
   ```
   /plugin marketplace add tpiperatgod/hi.md
   /plugin install himd
   ```
2. Get a [DashScope API key](https://dashscope.console.aliyun.com/apiKey) and set it:
   ```bash
   export DASHSCOPE_API_KEY="your-key"
   ```
3. Run the guided setup:
   ```
   /himd:setup
   ```
4. Start talking:
   ```
   /hi
   ```

If anything goes wrong, run `/himd:doctor` for guided diagnosis.

`/hi` also supports project-local persona customization. Copy a preset from `plugins/himd/personas/zh/presets/` or `plugins/himd/personas/en/presets/` to `.himd/persona.md`, or start from the matching template under `plugins/himd/personas/zh/` or `plugins/himd/personas/en/`. See `plugins/himd/personas/README.md` for the layout.

## Documentation

| Topic | Link |
|-------|------|
| Plugin setup & troubleshooting | [Plugin README](plugins/himd/README.md) |
| Install from source / release artifacts | [Install guide](docs/install.md) |
| Architecture & MCP tools | [Architecture](docs/architecture.md) |
| Releasing artifacts | [Releasing](docs/releasing.md) |
| Contributing | [Contributing](docs/contributing.md) |

## License

MIT
