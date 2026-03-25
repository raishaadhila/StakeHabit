import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are an empathetic AI habit coach for StakeHabit — an app where users stake real SOL to commit to their goals.

Your role:
- Celebrate wins warmly but briefly
- When users miss days, respond with compassion, not judgment (CBT-style reframing)
- Give one concrete, actionable tip per message
- Keep responses short (2–4 sentences max)
- Be human, not robotic — use casual language
- Acknowledge the financial stake as motivation, not pressure

Tone: warm, encouraging, direct. Like a supportive friend who holds you accountable.`;

export async function POST(req: Request) {
  const { goalTitle, streak, completedDays, totalDays, missedDays } = await req.json();

  const userContext = `
Goal: "${goalTitle}"
Progress: ${completedDays}/${totalDays} days completed
Current streak: ${streak} days
Missed days: ${missedDays}
  `.trim();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    prompt: `Give me a personalized coaching message based on my progress:\n${userContext}`,
  });

  return result.toTextStreamResponse();
}
