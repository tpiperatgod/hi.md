# Install guide

## Option 1: Install from source

Requires [Rust](https://rustup.rs/) 1.88+.

```bash
git clone https://github.com/tpiperatgod/hi.md.git
cd hi.md
cargo build --release
# Binary at target/release/himd
```

## Option 2: Install from release artifact

If a binary has been published for your platform, download it from [GitHub Releases](https://github.com/tpiperatgod/hi.md/releases). Release artifacts are published manually and may lag the current branch state.

**macOS:**
- Apple Silicon Mac → `himd-darwin-arm64.tar.gz`
- Intel Mac → `himd-darwin-x64.tar.gz`

```bash
tar xzf himd-darwin-*.tar.gz
chmod +x himd
```

If macOS quarantine blocks execution:
```bash
xattr -d com.apple.quarantine himd
```

**Windows:**
- `himd-windows-x64.zip`

```powershell
Expand-Archive .\himd-windows-x64.zip -DestinationPath .\himd
```

## Next steps

After installing the binary, run `/himd:setup` inside Claude Code for guided MCP server registration.
