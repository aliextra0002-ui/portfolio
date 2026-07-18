# WORKFLOW.md — Vague vs. Precise Prompting Drill

## Feature
A contact form for the portfolio's Contact page — name, email, and message fields, with client-side validation and a submission handler (`lib/contact.js`).

## Round 1 — Vague Prompt
**Prompt used:** `make a contact form`

No file references, no constraints, no example behavior, and no verification step. I accepted whatever Cursor produced without editing it.

**What I got:** A working `ContactForm` component with three fields, inline validation messages (name min 2 chars, valid email format, message min 10 chars), and a styled submit button matching the site's existing look. This was more complete than I expected for a one-line prompt — Cursor pulled context from the project's `CLAUDE.md` and `README.md`, which already describe the stack and conventions, so "vague" in isolation still inherited project-level context I hadn't written into the prompt itself.

**What was missing:** No automated tests. No explicit handling of loading/success/error states after submission — the form just called the handler with no visible feedback path for failure cases. Nothing verified the validation logic actually worked beyond visual inspection in the browser.

## Round 2 — Precise Prompt
**Prompt used:** Named the exact fields and their validation rules (name required/min 2 chars, email required/valid format, message required/min 10 chars), asked for inline errors matching existing site styling, and explicitly required unit tests for the validation logic plus loading/success/error states — with a verification step ("write it, then write tests and run them").

**What changed, concretely:**
- `lib/contact.js` — nearly identical to Round 1; the only diff was removing a leftover comment (`// Hook up Resend or another provider here when ready.`). The core validation logic was already close to correct in Round 1, which surprised me.
- `lib/contact.test.js` — a completely new file, five tests covering valid input, invalid email, empty fields, a too-short name, and a too-short message. None of this existed in Round 1.
- Running `npm test` confirmed all 5 tests passed (504ms, vitest).

## The Real Difference
The UI looked almost the same in both rounds — which initially made the drill feel pointless. The actual difference wasn't in the form's appearance; it was in **verification**. Round 1 gave me code I had to trust by eye. Round 2 gave me code with an executable proof that the validation rules actually hold (5/5 tests passing), which is the difference between "looks right" and "demonstrably right."

## AI Mistake I Caught
In Round 1, Cursor's contact handler left a stale comment (`// Hook up Resend or another provider here when ready.`) sitting in production-facing code with no ticket or follow-up reference — a small but real signal that "accept the first vague output" leaves loose ends that precise, verified prompting catches and cleans up.

## Time Comparison
Round 1 took less time to prompt but I couldn't trust it without manually testing every validation case myself in the browser. Round 2 took longer to write the prompt but the verification step meant I didn't have to manually re-check anything — the tests did it. End-to-end, Round 2 was the faster path to a form I actually trust.