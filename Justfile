set shell := ["zsh", "-euo", "pipefail", "-c"]

windows_target := "x86_64-pc-windows-gnu"

default:
    @just --list

build-host:
    cargo build --release

build-windows:
    cargo build --release --target {{windows_target}}

build-release: build-host build-windows

package-release version: build-release
    rm -rf dist
    mkdir -p dist/macos dist/windows
    arch="$(uname -m)"; \
    case "$arch" in \
      arm64) macos_asset="himd-darwin-arm64.tar.gz" ;; \
      x86_64) macos_asset="himd-darwin-x64.tar.gz" ;; \
      *) echo "unsupported macOS architecture: $arch" >&2; exit 1 ;; \
    esac; \
    cp target/release/himd dist/macos/himd; \
    cp target/{{windows_target}}/release/himd.exe dist/windows/himd.exe; \
    tar -C dist/macos -czf "dist/$macos_asset" himd; \
    (cd dist/windows && zip -q ../himd-windows-x64.zip himd.exe); \
    (cd dist && shasum -a 256 "$macos_asset" himd-windows-x64.zip > checksums.txt); \
    rm -rf dist/macos dist/windows

create-release version:
    gh release create "v{{version}}" --draft --verify-tag --generate-notes

upload-release version:
    gh release upload "v{{version}}" dist/* --clobber

release version: (package-release version) (create-release version) (upload-release version)
    @:
