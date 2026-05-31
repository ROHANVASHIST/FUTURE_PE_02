import { ProductInput } from './hooks.js';

export function buildCaptionPrompt(input: ProductInput, scriptSummary: string): string {
  return `
Write 3 Instagram caption variants for this ad. Captions support the video —
they don't repeat it.

PRODUCT: ${input.name}
SCRIPT SUMMARY: ${scriptSummary}
PLATFORM: Instagram Reels / Feed Ad

CAPTION TYPES:
1. Story-first — opens with a relatable 1-line story, ends with CTA
2. Benefit-list — 3 punchy bullets + CTA (good for feed ads)
3. Question hook — opens with a question the target audience asks themselves

RULES:
- Max 150 characters for the above-the-fold visible part
- Include 5 relevant hashtags at the end (not in the main copy)
- CTA in every caption
- No emojis in excess — max 3 per caption
- Write in the same first-person voice as the video

Respond ONLY with this JSON:
{
  "captions": [
    { "type": "string", "text": "string", "hashtags": ["string"] }
  ]
}
`.trim();
}
