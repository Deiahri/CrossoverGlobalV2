---
name: skill-maintainer
description: Maintains project skills located in .claude/skills. Only used when explicitly instructed.
---

# Skill Maintainer

This skill governs the structure, creation, and validation of project skills.  
It is only invoked when explicitly instructed to maintain skills.

---

## Managed Skills

### 1. Site Map
**Skill Definition:** `.claude/skills/site-map/SKILL.md`  
**Source File:** `site/SiteMap.md`

Purpose:
- Defines canonical site structure
- Documents page purpose and linking relationships
- Agents must not deviate from this structure

Maintenance Requirements:
- Validate all referenced pages exist
- Ensure no orphan or undocumented pages
- Enforce path consistency

---

### 2. Components
**Skill Definition:** `.claude/skills/components/SKILL.md`  
**Source File:** `site/_components/components.md`

Purpose:
- Defines reusable UI components and usage rules
- Only used when creating or modifying components

Maintenance Requirements:
- Check for existing component before defining new one
- All components must reference design-language tokens
- Documentation must include purpose and usage conditions only

---

### 3. Business Info
**Skill Definition:** `.claude/skills/business-info/SKILL.md`

Purpose:
- Single authoritative source of business facts
- Used only when content requires verified business information

If Missing:
1. Inspect https://crossoverglobal.org
2. Extract minimal verified facts
3. Record source and timestamp
4. Avoid verbosity

---

### 4. Design Language
**Skill Definition:** `.claude/skills/design-language/SKILL.md`  
**Source File:** `site/app/globals.css`

Purpose:
- Defines all design tokens and UI semantics

Required Definitions:
- typography scale (rem)
- spacing scale (rem)
- color scale (100–1000)
- breakpoints (px)
- shadows
- animations
- semantic tokens

Maintenance Requirements:
- If globals.css does not exist → notify user immediately
- Request required inputs to create minimal design language
- Ensure all UI work references these tokens

---

## Missing Skill Procedure

If a managed skill does not exist:

1. Create the skill in `.claude/skills/<skill-name>/SKILL.md`
2. Include YAML metadata + markdown body
3. Define source references and validation rules
4. Request user review before finalization

---

## Enforcement Rules

- Skill definitions must live in `.claude/skills/`
- Source artifacts must live in `/site/`
- No skill may contradict another skill
- All paths must be repository-root relative
- Design-language usage is mandatory for UI decisions
- Skills must remain minimal, precise, and non-redundant

---

## Acceptance Criteria

A maintenance action is complete when:

- Skill exists in `.claude/skills/`
- Referenced source files exist
- Metadata is present and valid
- Paths are consistent
- Responsibilities are clearly scoped
- No duplicated authority across skills