import { ProductInput } from './hooks.js';

export function buildCTAPrompt(input: ProductInput): string {
  return `
Generate 6 CTA (call-to-action) variants for this product across different
funnel stages and intent levels.

PRODUCT: ${input.name} — ${input.price}
PLATFORM: ${input.platform}

GENERATE ONE CTA FOR EACH OF THESE FUNNEL STAGES:
1. Cold audience (awareness) — soft ask, no pressure
2. Warm audience (consideration) — social proof nudge
3. Hot audience (conversion) — direct, urgency-based
4. Discount/offer-driven — anchors on price or deal
5. Curiosity-driven — drives link click through information gap
6. Community/identity — speaks to belonging or self-image

RULES:
- Max 12 words per CTA
- Each must feel natural spoken aloud in a video
- Do not use "click the link below" — too generic
- Vary the first verb across all 6

Respond ONLY with this JSON:
{
  "ctas": [
    { "stage": "string", "text": "string", "use_case": "string" }
  ]
}
`.trim();
}
