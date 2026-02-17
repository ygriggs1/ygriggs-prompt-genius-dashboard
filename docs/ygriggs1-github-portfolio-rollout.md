# ygriggs1 GitHub Portfolio Rollout

This guide rewrites the original plan so all account/repo references use **ygriggs** and **ygriggs1**.

## Scope of this update

- Replace all legacy personal-brand mentions with:
  - `ygriggs` (profile/account naming)
  - `ygriggs1` (organization naming)
  - `@ygriggs` (social handle placeholder)
- Keep all API key safety warnings.
- Keep portfolio project naming aligned to prompt engineering and RAG.

## Fast-start checklist

1. Confirm account username is `ygriggs` (or closest available variant).
2. Confirm organization is `ygriggs1`.
3. Use this exact bio draft:
   - `Self-taught Prompt Engineer specializing in LLM optimization, RAG, and OpenAI APIs for mobile AI. Passionate about generative AI—check my projects! | X: @ygriggs`
4. Use name field:
   - `Yurick Griggs`
5. Ensure no repository, README, or social link still uses legacy naming.

## Profile README template (updated)

```md
# Hi, I'm Yurick Griggs! 👋

Aspiring AI Prompt Engineer with expertise in engineering prompts for LLMs, RAG systems, and mobile AI integrations. Leveraging advanced AI tools for rapid iteration, I've built projects demonstrating 30-45% improvements in AI performance.

## Key Skills
- Prompt Engineering & Optimization
- LLMs (OpenAI GPT series)
- RAG & Vector Stores (Pinecone, FAISS)
- Python, API Integration
- A/B Testing for Prompts

## Pinned Projects
Pin the 4 repos below for visibility.

Connect with me: [X](https://x.com/ygriggs) | [LinkedIn](https://linkedin.com/in/yurick-griggs)
```

## Repositories to create under `ygriggs1`

Create these as public repos and include README + MIT License:

1. `LLM-Powered-Chatbot-Optimizer`
2. `RAG-Based-Information-Retrieval-System`
3. `Prompt-Experimentation-Framework`
4. `Generative-AI-Mobile-Prototype`

## Required quality gates before publishing

- [ ] No hardcoded API keys in any committed file.
- [ ] `.env` is gitignored.
- [ ] Each repo has:
  - [ ] README with setup + usage
  - [ ] source folder (`src/`)
  - [ ] sample/test assets
  - [ ] metrics section or report
- [ ] Repo Discussions enabled where appropriate.
- [ ] Four project repos pinned on profile.

## Repo naming and copy consistency sweep

Run these checks in each repository root before publishing:

```bash
rg -n "Patxi|patxilanoix|Patxilanoix|@Patxilanoix"
rg -n "OPENAI_API_KEY\s*=\s*['\"]"
```

Expected result:
- First command returns no matches.
- Second command returns no committed secrets.

## Promotion copy (updated)

```text
Excited to share my Prompt Engineering portfolio! Explore projects on https://github.com/ygriggs1 #AIPromptEngineer #GenAI
```

## Notes

- If a desired username is unavailable, keep branding as close as possible (`ygriggs`, `ygriggs1`) and keep it consistent everywhere.
- Keep commit history incremental to show active project iteration.
