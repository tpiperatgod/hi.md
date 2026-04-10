# hi.md

[![plugin version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftpiperatgod%2Fhi.md%2Fmain%2Fplugins%2Fhimd%2F.claude-plugin%2Fplugin.json&query=%24.version&label=plugin%20version&color=0A66C2)](https://github.com/tpiperatgod/hi.md/blob/main/plugins/himd/.claude-plugin/plugin.json)
[![voice-bridge version](https://img.shields.io/badge/dynamic/toml.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftpiperatgod%2Fhi.md%2Fmain%2FCargo.toml&query=%24.workspace.package.version&label=voice-bridge%20version&color=0F9D58)](https://github.com/tpiperatgod/hi.md/blob/main/Cargo.toml)
[![license](https://img.shields.io/badge/dynamic/toml.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftpiperatgod%2Fhi.md%2Fmain%2FCargo.toml&query=%24.workspace.package.license&label=license&color=8B5CF6)](https://github.com/tpiperatgod/hi.md/blob/main/plugins/himd/LICENSE)

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

`/hi` supports project-local personas. See [personas](plugins/himd/personas/README.md).

## Documentation

| Topic | Link |
|-------|------|
| Plugin setup & troubleshooting | [Plugin README](plugins/himd/README.md) |
| Persona customization | [Persona guide](plugins/himd/personas/README.md) |
| Install from source / release artifacts | [Install guide](docs/install.md) |
| Architecture & MCP tools | [Architecture](docs/architecture.md) |
| Releasing artifacts | [Releasing](docs/releasing.md) |
| Contributing | [Contributing](docs/contributing.md) |

## License

MIT
