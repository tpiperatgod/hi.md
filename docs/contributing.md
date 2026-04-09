# Contributing

This repository does not maintain GitHub Actions workflows. Build, test, and lint locally before publishing changes or preparing a manual release.

## Build & test

```bash
git clone https://github.com/tpiperatgod/hi.md.git
cd hi.md
cargo build
cargo test --workspace -- --test-threads=1
cargo clippy --workspace -- -D warnings
cargo fmt --all --check
```

## Run a single test

```bash
cargo test -p himd-core -- --test-threads=1 test_name
```
