# Taste

## Communication

- Communicates in terse, lowercase messages with minimal punctuation (e.g., "i meant this", "what models youre using"), expecting the agent to infer intent from context. Confidence: 0.7
- When a request is misunderstood, clarifies by pasting a direct URL (including the anchor/section) to the relevant documentation page rather than re-explaining in prose, and expects the agent to fetch and read it. Confidence: 0.6

## Workflow

- Validates work beyond screenshots before declaring done: runs a typecheck (`npx tsc --noEmit`) and a production build (`npm run build`) alongside visual verification. Confidence: 0.6
