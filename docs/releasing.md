# Releasing

This guide covers the full release flow for himd: building artifacts, packaging, and publishing to GitHub Releases.

All release commands are driven by the root `Justfile`. The flow runs entirely on a local macOS machine — there is no CI-based release automation.

## Prerequisites

| Tool | Purpose | Install |
|------|---------|---------|
| Rust 1.88+ | Build the workspace | [rustup.rs](https://rustup.rs/) |
| `just` | Command runner | `brew install just` |
| `gh` | GitHub CLI for creating releases | `brew install gh` |
| `x86_64-w64-mingw32-gcc` | Windows GNU cross-linker | `brew install mingw-w64` |

Ensure the Windows GNU target is installed:

```bash
rustup target add x86_64-pc-windows-gnu
```

Verify `gh` is authenticated:

```bash
gh auth status
```

## Release artifacts

Each release produces three files in `dist/`:

| File | Platform |
|------|----------|
| `himd-darwin-arm64.tar.gz` or `himd-darwin-x64.tar.gz` | macOS (auto-detected from host) |
| `himd-windows-x64.zip` | Windows x64 (GNU) |
| `checksums.txt` | SHA-256 checksums for all archives |

## Step-by-step release

### 1. Update the version

Edit `Cargo.toml` workspace version:

```toml
[workspace.package]
version = "0.2.0"
```

Commit the version bump:

```bash
git add Cargo.toml
git commit -m "chore: bump version to 0.2.0"
```

### 2. Create and push the tag

```bash
git tag v0.2.0
git push origin main
git push origin v0.2.0
```

The tag **must** exist on the remote before creating the GitHub release.

### 3. Run the full release

```bash
just release 0.2.0
```

This single command runs the following in order:

1. **`build-release`** — builds both the host macOS binary and the Windows GNU binary
2. **`package-release`** — packages binaries into `dist/` with checksums
3. **`create-release`** — creates a **draft** GitHub release for `v0.2.0` with auto-generated notes
4. **`upload-release`** — uploads all files in `dist/` to the draft release

### 4. Publish the release

1. Open the draft release on GitHub: `gh release view v0.2.0 --web`
2. Review the uploaded assets and release notes
3. Click **Publish release**

## Running individual steps

You can run each step independently if needed:

```bash
# Build only
just build-host           # macOS binary only
just build-windows        # Windows binary only
just build-release        # both

# Package only (requires binaries already built)
just package-release 0.2.0

# GitHub release only (requires dist/ already populated)
just create-release 0.2.0
just upload-release 0.2.0
```

Re-running `upload-release` overwrites existing assets (`--clobber`).

## Verifying artifacts

After packaging, verify the checksums:

```bash
(cd dist && shasum -a 256 -c checksums.txt)
```

Inspect archive contents:

```bash
tar tzf dist/himd-darwin-arm64.tar.gz
unzip -l dist/himd-windows-x64.zip
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `build-windows` fails with linker error | Verify `x86_64-w64-mingw32-gcc` is installed: `brew install mingw-w64` |
| `create-release` fails with "tag not found" | Push the tag first: `git push origin v0.2.0` |
| `create-release` fails with "release already exists" | Delete the existing release: `gh release delete v0.2.0` and retry |
| `unsupported macOS architecture` | The Justfile only supports `arm64` and `x86_64` hosts |
| macOS quarantine blocks the binary | `xattr -d com.apple.quarantine himd` |
