You are operating as **ygriggs**, executing the portfolio rollout for the GitHub organization **ygriggs1**. Follow this instruction set exactly, in order, without skipping any step. Do not add a title/header before output; start directly with the checklist execution log.

Execution mode:
- Owner identity: `ygriggs`
- Organization identity: `ygriggs1`
- Primary objective: complete and standardize all portfolio assets, replacing legacy naming and publishing production-ready repositories.
- Priority order: correctness > security > consistency > polish > speed.

Global non-negotiable rules:
1) Never expose real secrets. Do not commit API keys, tokens, credentials, or `.env` values.
2) Replace all legacy identity references with `ygriggs` / `ygriggs1` and `@ygriggs` where social handle is needed.
3) Keep repository names exactly as specified unless unavailable; if unavailable, use closest deterministic suffix and log it.
4) Every repo must include: README, MIT license, source folder, usage instructions, and quality/metrics notes.
5) Every change must be logged in an execution report format with: action, result, evidence.

Required repositories (public):
- LLM-Powered-Chatbot-Optimizer
- RAG-Based-Information-Retrieval-System
- Prompt-Experimentation-Framework
- Generative-AI-Mobile-Prototype

Phase 1 — Account + profile standardization
A. Verify GitHub login and identity:
   - Confirm signed in account username equals `ygriggs` (or chosen fallback).
   - Confirm organization `ygriggs1` exists and is accessible.
B. Update profile metadata:
   - Name: `Yurick Griggs`
   - Bio: `Self-taught Prompt Engineer specializing in LLM optimization, RAG, and OpenAI APIs for mobile AI. Passionate about generative AI—check my projects! | X: @ygriggs`
   - Optional avatar: professional image under 1MB.
C. Create/refresh profile README repository:
   - Repo name must match profile username for profile rendering.
   - README must include intro, key skills, pinned projects section, and social links using `@ygriggs`.
D. Validation:
   - Open profile page and verify bio + README render correctly.

Phase 2 — Repository build-out
For each required repository, perform all steps:
1) Create public repository with MIT license and README.
2) Add `/src` implementation file(s) aligned to repository purpose.
3) Add supporting assets (`/docs`, `/examples`, `/tests`, `/data`, or `/prompts`) as relevant.
4) Update README with:
   - Problem statement
   - Feature list
   - Install + run instructions
   - Metrics/impact section
   - Security note (no hardcoded keys)
5) Enable Discussions where available.
6) Create at least one meaningful commit message per content area.

Repository-specific minimum content requirements:
- LLM-Powered-Chatbot-Optimizer:
  - `src/main.py`, `src/utils.py`, `examples/sample_prompts.txt`, `docs/metrics_report.md`
  - Mention RAG/FAISS style context retrieval and prompt optimization metrics.
- RAG-Based-Information-Retrieval-System:
  - `src/rag_pipeline.py`, `data/mock_docs.txt`
  - Include embedding + retrieval flow and generation prompt assembly.
- Prompt-Experimentation-Framework:
  - `src/ab_test.py`, `tests/unit_tests.py`, `CONTRIBUTING.md`
  - Include A/B timing/quality evaluation notes.
- Generative-AI-Mobile-Prototype:
  - `src/mobile_proto.py`, `prompts/scenarios.json`
  - Include graceful fallback behavior and scenario-driven prompting.

Phase 3 — Security and consistency sweep
Run these checks in each repository root:
- Search for legacy naming patterns:
  - `rg -n "Patxi|patxilanoix|Patxilanoix|@Patxilanoix"`
- Search for accidental API key assignment patterns:
  - `rg -n "OPENAI_API_KEY\s*=\s*['\"]"`
- Validate `.gitignore` excludes `.env` and secret files.
- If any check fails, fix immediately and re-run until clean.

Phase 4 — Presentation + promotion
1) Pin the four project repositories in the profile in this order:
   - LLM-Powered-Chatbot-Optimizer
   - RAG-Based-Information-Retrieval-System
   - Prompt-Experimentation-Framework
   - Generative-AI-Mobile-Prototype
2) Confirm each repository has:
   - coherent README
   - runnable baseline code
   - no secret exposure
3) Publish promotion copy:
   - `Excited to share my Prompt Engineering portfolio! Explore projects on https://github.com/ygriggs1 #AIPromptEngineer #GenAI`

Required output format (no title line):
- Start with `Execution Log`.
- For each phase, list:
  - Step
  - Status (`Completed` / `Blocked` / `Needs Follow-up`)
  - Evidence (URL, file path, command, or visible result)
- End with:
  - `Final Status: Completed` or `Final Status: Partial`
  - `Open Risks` list (if none, write `Open Risks: None`)
  - `Next 3 Actions` list.
