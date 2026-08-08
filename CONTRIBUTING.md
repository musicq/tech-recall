# Writing guide

## What belongs here

Add a note when a technical idea is worth remembering but easy to forget, especially:

- a mechanism repeatedly asked about;
- a confusing boundary between similar concepts;
- an implementation pattern that is easier to remember with one small example;
- a technology choice whose trade-off is likely to matter again.

Do not add raw chat transcripts, broad news summaries, exhaustive API references, or long step-by-step tutorials.

## The shape of a good note

A note should usually contain:

1. **One-sentence recall** — the shortest accurate mental model.
2. **The problem** — why the concept exists.
3. **The mechanism** — the few steps that make it work.
4. **A minimal example or diagram** — only when it removes ambiguity.
5. **Boundaries or common mistakes** — what the simplified explanation might hide.
6. **Sources** — primary references for factual or version-sensitive claims.

Use `templates/note.md` as a menu, not a form. Delete every optional section that does not improve recall.

## Style

- Write for a technically experienced reader who has forgotten the details.
- Lead with the answer; avoid historical introductions unless history explains the design.
- Prefer short sentences and specific nouns.
- Define an unfamiliar term once, then use it consistently.
- Keep code runnable when practical, but remove setup unrelated to the mechanism.
- Avoid filler such as “众所周知”, “简单来说”, “值得注意的是”, and repeated conclusions.
- Do not claim a simplified diagram is the exact internal implementation.

## Noise budget

The default limit is 400–1,000 Chinese characters, excluding code, diagrams, and sources.

When the note becomes too long, remove content in this order:

1. generic background;
2. repeated examples;
3. low-probability edge cases;
4. exhaustive lists of libraries or products;
5. history that does not explain the mechanism.

If the core idea still cannot fit, split it into linked notes such as overview, implementation, and trade-offs.

## Common scenarios and related solutions

These sections are useful, but optional.

### Add common scenarios when

They make the abstract mechanism recognizable in real code or systems. Use at most three concrete bullets.

Good: “Parsing line-oriented application logs as they are produced.”

Noise: “Useful in many modern applications.”

### Add related solutions when

The reader may otherwise choose or remember the wrong tool. Compare only the essential decision boundary, with at most three alternatives.

Good: “Use NDJSON when you control record framing; use a token parser when the input must remain one large JSON document.”

Noise: a list of every JSON streaming library.

## Diagrams

Prefer a small Mermaid flowchart for pipelines, package layouts, state machines, or dependency graphs. A diagram must reveal a relationship that prose alone makes harder to see.

Keep diagrams small and readable in GitHub's default renderer. Decorative images are outside the scope of this repository.

## Before submitting

- Search for an existing note and merge when possible.
- Check that the first sentence alone is useful.
- Remove unused template headings.
- Confirm examples match the explanation.
- Verify version-sensitive claims using primary sources.
- Update the root README index.
- Check all relative links.
