import { generateText } from "ai";
import { SYSTEM_PROMPT } from "../lib/voice.js";

// Uses Vercel AI Gateway. On Vercel, auth is automatic (OIDC).
// Locally, set AI_GATEWAY_API_KEY. Change model with VOICE_MODEL env var.
const MODEL = process.env.VOICE_MODEL || "anthropic/claude-sonnet-4.5";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { format = "LinkedIn post", category = "", topic = "", notes = "" } = body;
    if (!topic.trim()) return res.status(400).json({ error: "Topic is required" });

    const prompt = [
      `Write a ${format} in Meera's voice.`,
      category && `Category: ${category}`,
      `Topic / brief: ${topic}`,
      notes && `Extra facts or constraints from the team: ${notes}`,
      format === "Newsletter" ? "Include a 'Subject:' line first, open with 'Hi,' and sign off 'Meera'." : "",
    ].filter(Boolean).join("\n");

    const { text } = await generateText({ model: MODEL, system: SYSTEM_PROMPT, prompt, temperature: 0.7 });
    return res.status(200).json({ text, model: MODEL });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err?.message || "Generation failed" });
  }
}
