# himd Personas

`/hi` can load one optional project-local persona from `.himd/persona.md`.

If the file exists, it controls reply tone, style, and TTS defaults for that project. If it does not exist, `/hi` falls back to the built-in default companion.

This directory ships mirrored persona source files in two languages so you can start from a preset or template instead of writing from scratch.

## Quick start

Use a preset if you want the fastest path:

```bash
mkdir -p .himd
cp plugins/himd/personas/zh/presets/gentle.md .himd/persona.md
```

Or use the English version:

```bash
mkdir -p .himd
cp plugins/himd/personas/en/presets/gentle.md .himd/persona.md
```

After that, run `/hi` in the project and the persona will take effect automatically.

## Layout

- `zh/` contains Chinese-authored templates and presets.
- `en/` contains English-authored templates and presets.
- Both directories use the same filenames, so you can switch languages without changing the preset name.
- `.himd/persona.md` is the only active persona file that `/hi` reads at runtime.

## How it works

- There is no separate persona command.
- There is no layered override chain.
- The active persona is always exactly the contents of `.himd/persona.md`.
- Persona settings are project-local, so different repositories can use different styles.

## Use a preset

Copy any preset into `.himd/persona.md`.

```bash
mkdir -p .himd
cp plugins/himd/personas/zh/presets/gentle.md .himd/persona.md
# or
cp plugins/himd/personas/en/presets/gentle.md .himd/persona.md
```

Preset filenames are mirrored across `zh/` and `en/`, so you can switch language sources without changing the preset name.

Common examples:

- `gentle.md` for a soft, low-stimulation tone
- `plain.md` for a natural, non-cutesy tone
- `sharp.md` for a more direct tone
- `english-buddy.md` or `english-coach.md` for bilingual English practice

## Create your own

Start from either template:

- `plugins/himd/personas/zh/TEMPLATE.md`
- `plugins/himd/personas/en/TEMPLATE.md`

Then copy one into `.himd/persona.md` and edit it directly.

## Choosing `zh/` vs `en/`

- Choose `zh/` if you want to author the persona primarily in Chinese.
- Choose `en/` if you want to author it primarily in English.
- The matching filenames make it easy to compare the same preset or template across both directories.

## Example workflow

1. Pick a preset or template under `plugins/himd/personas/zh/` or `plugins/himd/personas/en/`.
2. Copy it to `.himd/persona.md`.
3. Edit `.himd/persona.md` for your project if needed.
4. Run `/hi`.

If the persona file is malformed, `/hi` will ask you to replace it with a valid template or preset.
