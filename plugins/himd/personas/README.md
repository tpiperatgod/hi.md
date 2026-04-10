# himd Personas

This directory ships mirrored persona source files in two languages.

## Layout

- `zh/` contains Chinese-authored templates and presets.
- `en/` contains English-authored templates and presets.
- Both directories use the same filenames, so you can switch languages without changing the preset name.

## Use a preset

Copy any preset into `.himd/persona.md`.

```bash
mkdir -p .himd
cp plugins/himd/personas/zh/presets/gentle.md .himd/persona.md
# or
cp plugins/himd/personas/en/presets/gentle.md .himd/persona.md
```

## Create your own

Start from either template:

- `plugins/himd/personas/zh/TEMPLATE.md`
- `plugins/himd/personas/en/TEMPLATE.md`
