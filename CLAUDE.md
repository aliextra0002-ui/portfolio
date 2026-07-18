# Project conventions

## Stack
- React (frontend)
- Claude API (via Anthropic SDK)
- Deployment: Vercel

## Conventions
- Commit messages follow Conventional Commits (feat:, fix:, docs:, chore:)
- Components in PascalCase, files in kebab-case
- Prefer functional components + hooks
- Keep API keys in .env, never commit secrets

## Goal
This repo is the capstone project proving: "I can build deployed, multilingual AI products by integrating the Claude API with React." Target audience: founder/CTO of a Pakistani customer-support-automation startup. One action: get them to book a call.

## Site structure
Home → Work → About → Contact (see README for details)

## Rules learned from prompting drill
- Always specify field-level validation rules explicitly (required, min/max length, format) — never assume the model will guess the right constraints.
- Every form or logic-handling feature must include a verification step in the prompt ("write it, then write tests and run them") — vague prompts skip tests entirely.
- Project context files (CLAUDE.md, README.md) get pulled in automatically, so even short prompts inherit conventions — don't mistake a short prompt for a context-free one.