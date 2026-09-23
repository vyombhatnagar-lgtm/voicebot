# voicebot

Meera Pillai (Skinstinct) voice bot for MESA Case 1.

- `SKILL.md` - the voice skill (also usable as a Claude skill)
- `index.html` - UI
- `api/generate.js` - Vercel function calling Vercel AI Gateway
- `lib/voice.js` - system prompt built from SKILL.md + seed facts

## Deploy
Import this repo on Vercel (framework: Other). AI Gateway auth is automatic on Vercel via OIDC.
If you see an auth error, create an AI Gateway API key in Vercel and add env var `AI_GATEWAY_API_KEY`.
Optional: `VOICE_MODEL` (default `anthropic/claude-sonnet-4.5`).
