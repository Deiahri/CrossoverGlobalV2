---
name: components
description: Catalogs reusable UI components and usage rules. Only used when creating or modifying components.
---

# Components

Defines all reusable UI components, their purpose, and usage conditions.
Only used when creating or modifying components.

---

## Current Components

None defined. The project is in early scaffold state.

---

## Source File

**`site/_components/components.md` does not exist.**

This file must be created when the first reusable component is introduced.
It should define:
- Component name and file path
- Purpose (one sentence)
- Usage conditions (when to use / not use)
- Required design-language tokens

---

## Rules

- Check this skill before creating any new component — avoid duplicates
- All components must use design-language tokens exclusively (no raw values)
- Documentation must remain minimal: purpose and usage conditions only
- Component files live in `site/_components/` or `site/app/_components/`

---

## Validation

- [ ] `site/_components/components.md` exists
- [ ] Each listed component has a corresponding source file
- [ ] All components reference design-language tokens
- [ ] No component is documented that does not exist in the codebase
