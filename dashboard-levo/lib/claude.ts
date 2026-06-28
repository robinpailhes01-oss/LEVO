import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// Client Claude côté serveur uniquement. La clé n'est jamais exposée au navigateur.

let cached: Anthropic | null = null;

export const CLAUDE_MODEL = "claude-opus-4-8";

export function getClaude(): Anthropic {
  if (cached) return cached;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY manquante dans .env.local");
  }
  cached = new Anthropic({ apiKey });
  return cached;
}

interface CompleteOptions {
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Appel texte simple. Retourne le texte concaténé + l'usage tokens.
 */
export async function complete({
  system,
  prompt,
  maxTokens = 4096,
  temperature = 0.7,
}: CompleteOptions): Promise<{ text: string; tokens: number }> {
  const client = getClaude();
  const res = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: maxTokens,
    temperature,
    system,
    messages: [{ role: "user", content: prompt }],
  });

  const text = res.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  const tokens =
    (res.usage?.input_tokens ?? 0) + (res.usage?.output_tokens ?? 0);

  return { text, tokens };
}

/**
 * Extrait le premier bloc JSON valide d'une réponse Claude (objet ou tableau),
 * en tolérant un éventuel ```json ... ``` autour.
 */
export function extractJson<T>(text: string): T {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.search(/[[{]/);
  if (start === -1) {
    throw new Error("Aucun JSON trouvé dans la réponse Claude");
  }
  // Cherche la fin équilibrée en repartant du dernier ] ou }.
  const end = Math.max(candidate.lastIndexOf("]"), candidate.lastIndexOf("}"));
  const slice = candidate.slice(start, end + 1);
  return JSON.parse(slice) as T;
}
