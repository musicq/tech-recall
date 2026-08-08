# Instructions for AI agents

These instructions apply to the entire repository.

## Repository purpose

This is a personal **memory-refresh knowledge base**, not a textbook, blog, chat archive, or exhaustive reference.

A good note lets the reader recover the correct mental model in a few minutes. Optimize for recall value per line, not completeness.

The repository also contains a VitePress reading site. The site is only a presentation layer over the Markdown notes; do not let website maintenance make note-taking heavier.

## Required workflow

When asked to record a technical discussion:

1. Read `README.md`, `CONTRIBUTING.md`, and `templates/note.md`.
2. Search existing files, titles, aliases, and tags before creating anything.
3. Identify the smallest independent concept. One note should answer one core question.
4. Prefer updating an existing note. Create a new note only when the concept is meaningfully different.
5. Verify implementation details with primary sources: official documentation, standards, source code, release notes, or maintainers' design documents.
6. Rewrite the discussion into a note. Never paste or lightly edit the conversation transcript.
7. Update the root `README.md` index in the same change.
8. Check headings, internal links, code, and Mermaid syntax before finishing.
9. Run `npm run docs:build` when the environment supports it. If it cannot be run, say so in the completion report.
10. Change only files relevant to the requested topic.

## VitePress site rules

- Notes remain under `notes/<broad-topic>/<descriptive-slug>.md`; do not move them into a separate docs tree.
- `.vitepress/config.mts` automatically discovers Markdown files under each immediate `notes/<broad-topic>/` directory and builds the sidebar.
- Do **not** manually add every new note to the sidebar.
- The built-in local search indexes the rendered note pages automatically.
- `index.md` is the stable landing page. Do not add every note to the homepage.
- If a new broad-topic directory needs a nicer sidebar label, optionally add one entry to `categoryNames` in `.vitepress/config.mts`; otherwise its kebab-case name is humanized automatically.
- Do not modify deployment files for ordinary note additions.

## Writing contract

- Default language: concise Chinese. Keep established technical terms in English where that is clearer.
- Start with `> 一句话回忆：...` and state the decisive idea, not a vague definition.
- Default length: **400–1,000 Chinese characters**, excluding code, diagrams, and sources.
- Use 3–6 meaningful headings. Do not create sections merely to fill a template.
- Explain in this order when applicable: **problem → mechanism → minimal example → boundaries**.
- Distinguish a simplified mental model from exact implementation details.
- Prefer one concrete example over several abstract explanations.
- Keep all code focused on the mechanism; normally no more than 30 lines in total.
- Use at most one short analogy, and only when it makes the mechanism more precise.
- Do not repeat the introduction in a concluding summary.

## Optional content: strict noise control

### Common scenarios

Include `## 常用场景` only when it answers “Where will I actually encounter or use this?”

- Maximum 3 bullets.
- Each bullet must be concrete.
- Do not list generic benefits or every possible application.

### Related solutions

Include `## 和相关方案怎么选` only when readers are likely to confuse alternatives or need a decision boundary.

- Maximum 3 alternatives.
- Prefer a compact table: solution, essential difference, when to choose it.
- Do not write an ecosystem survey or a list of loosely related tools.
- If the comparison does not change understanding or choice, remove the section.

### Easy-to-confuse points

Use `## 容易混淆` for up to 3 high-value corrections. Prefer correcting a wrong mental model over adding trivia.

## Diagrams and images

- A note does not need an image by default.
- Add a diagram only when structure, data flow, dependency topology, lifecycle, or state transitions are clearer visually.
- Prefer Mermaid committed inline with the note.
- Use at most one main diagram, normally 5–9 nodes with short labels.
- Do not add decorative illustrations, screenshots of text, or a diagram that merely repeats the prose.
- External images must have a stable source, license information, alt text, and a local path under `assets/<note-slug>/`.

## Sources and version-sensitive facts

- End factual notes with `## Sources` and 2–5 high-quality links when useful.
- Prefer primary sources. Never invent a citation or cite a search-result summary as evidence.
- For behavior that can change, state the relevant version or the date checked.
- If sources disagree or the implementation cannot be verified, say so briefly rather than guessing.
- Do not turn the Sources section into a reading list.

## File organization

- Notes live at `notes/<broad-topic>/<descriptive-slug>.md`.
- Reuse an existing broad-topic folder whenever possible; avoid one-file micro-categories.
- Use lowercase kebab-case paths.
- Titles should use the term a reader is most likely to search for.
- Add aliases or related-note links inside the note when terminology differs.

## Completion report

After writing, report:

- files created or updated;
- whether an existing note was merged instead of duplicated;
- the main sources checked;
- whether `npm run docs:build` was run successfully;
- any remaining uncertainty.

Suggested commit messages:

- `notes: add <topic>`
- `notes: refine <topic>`
- `docs: update note guidelines`
