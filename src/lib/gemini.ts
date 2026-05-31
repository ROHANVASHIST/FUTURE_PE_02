import { GoogleGenAI } from '@google/genai';
import { UGC_SYSTEM_PROMPT } from './prompts/system-prompt.js';
import { buildHooksPrompt, buildScriptPrompt, buildCTAPrompt, buildCaptionPrompt, ProductInput } from './prompts/index.js';
import { UGCSchema, GeneratedAdPack } from './schemas/ugc-schema.js';

let aiInstance: GoogleGenAI | null = null;

function getAi() {
  if (!aiInstance) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiInstance;
}

async function callGenAI(userPrompt: string): Promise<string> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    config: {
      systemInstruction: UGC_SYSTEM_PROMPT,
      responseMimeType: "application/json"
    }
  });

  return response.text || "{}";
}

export async function generateAdPack(input: ProductInput): Promise<GeneratedAdPack> {
  // Step 1: generate hooks
  const hooksRaw = await callGenAI(buildHooksPrompt(input));
  const hooks = JSON.parse(hooksRaw).hooks;

  // Step 2: generate full script using the first hook (best-practice default)
  const scriptRaw = await callGenAI(buildScriptPrompt(input, hooks[0].text));
  const script = JSON.parse(scriptRaw).script;

  // Step 3: generate CTA variants
  const ctasRaw = await callGenAI(buildCTAPrompt(input));
  const ctas = JSON.parse(ctasRaw).ctas;

  // Step 4: generate captions
  const captionsRaw = await callGenAI(
    buildCaptionPrompt(input, script.problem + ' ' + script.solution)
  );
  const captions = JSON.parse(captionsRaw).captions;

  const pack = { hooks, script, ctas, captions };
  return UGCSchema.parse(pack); // Zod validation
}
