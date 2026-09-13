// Cloudflare Pages Function — proxies the AI chat widget to Gemini server-side
// so GEMINI_API_KEY never reaches the browser. Deployed automatically from
// this file; test locally with `npx wrangler pages dev dist` after a build.
import { getPortfolioContext } from '../../data';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface Env {
  GEMINI_API_KEY?: string;
}

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidMessage(m: unknown): m is ChatMessage {
  return (
    typeof m === 'object' &&
    m !== null &&
    ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'model') &&
    typeof (m as ChatMessage).text === 'string' &&
    (m as ChatMessage).text.length > 0 &&
    (m as ChatMessage).text.length <= MAX_MESSAGE_LENGTH
  );
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  if (!env.GEMINI_API_KEY) {
    return jsonResponse({ error: 'AI chat is not configured.' }, 503);
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES || !messages.every(isValidMessage)) {
    return jsonResponse({ error: 'Invalid message history.' }, 400);
  }

  const systemInstruction = `You are the AI assistant for Fahmi Dinsefa Jemal's portfolio website.

PORTFOLIO DATA:
${getPortfolioContext()}

CORE RULES:
1. Answer questions based on the PORTFOLIO DATA provided.
2. Be helpful, professional, yet a bit witty (aligning with Fahmi's style).
3. If someone asks for contact info, provide his email (fahmidinsefa@gmail.com) and LinkedIn link.
4. Keep answers concise and strictly relevant to his professional expertise (Systems, Backend, CP, etc.).
5. Do not repeat facts excessively. Make responses engaging.
6. If a question goes beyond the provided data, specify that you only have information on his professional portfolio.`;

  let geminiResponse: Response;
  try {
    geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: (messages as ChatMessage[]).map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );
  } catch (error) {
    console.error('Gemini request failed:', error);
    return jsonResponse({ error: 'AI backend unreachable.' }, 502);
  }

  if (!geminiResponse.ok) {
    console.error('Gemini API error:', geminiResponse.status, await geminiResponse.text());
    return jsonResponse({ error: 'AI backend error.' }, 502);
  }

  const data = (await geminiResponse.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';

  return jsonResponse({ text });
}
