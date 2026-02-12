

# LLM Chatbot Optimizer Dashboard

A professional prompt engineering portfolio piece with real AI integration, interactive A/B testing, and polished metrics visualization. Built to demonstrate $300K+ engineering caliber.

## Design System
- **Color scheme**: Blue/indigo gradient (#4F46E5 → #6366F1) with clean whites and subtle grays
- **Typography**: Inter font, professional hierarchy
- **Layout**: Tabbed interface with 4 main views, card-based with subtle shadows and smooth transitions
- **Dark mode**: Full dark mode toggle with seamless switching
- **Responsive**: Mobile-first, adapts from phone to desktop

## Tab 1: Prompt Optimizer
- **System prompt editor** — textarea with character count and syntax highlighting feel
- **User message input** — chat-style input with send button
- **Conversation history panel** — chat bubbles (user/assistant) with timestamps, streaming AI responses via Lovable AI (Gemini Flash)
- **Response metadata** — shows response time, token count, and model used beneath each response
- **Vector DB status indicator** — FAISS connection badge (green/red) with tooltip showing connection details

## Tab 2: A/B Testing
- **Side-by-side prompt editor** — Version A and Version B system prompts, each editable
- **Shared test input** — one user message sent to both versions simultaneously
- **Live comparison** — both responses stream in real-time side by side
- **Diff highlights** — visual indicators showing which version performed better on each metric
- **Winner badge** — auto-calculated based on weighted scoring of metrics

## Tab 3: Metrics & Evaluation
- **Performance dashboard cards** — response time, token usage, cost estimate, relevance score
- **Evaluation scores** — BLEU score, ROUGE score, custom relevance metric with progress bars
- **Historical chart** — line chart (Recharts) showing metric trends over test runs
- **Export results button** — downloads metrics as JSON/CSV

## Tab 4: Prompt Library
- **5 pre-built prompt templates**:
  1. Customer Support Agent
  2. Code Review Assistant
  3. Data Analysis Helper
  4. Content Summarizer
  5. Technical Documentation Writer
- Each template shows: name, description, category tag, system prompt preview
- **One-click load** — click a template to populate the Optimizer tab
- **Copy to clipboard** button on each template

## Backend (Lovable Cloud)
- Edge function for AI chat via Lovable AI gateway (streaming SSE)
- Handles both single prompt and A/B dual-prompt requests
- Error handling for rate limits (429) and payment (402) with user-friendly toasts

## Polish & Animations
- Skeleton loaders during AI responses
- Smooth tab transitions
- Pulse animation on the FAISS status indicator
- Fade-in for chat messages
- Hover effects on cards and buttons

