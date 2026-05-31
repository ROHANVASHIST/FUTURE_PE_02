export interface ProductInput {
  name: string;
  brand: string;
  category: string;
  price: string;
  coreProblem: string;
  coreResult: string;
  keyIngredient: string;
  targetPersona: string;
  platform: 'instagram' | 'youtube_shorts' | 'meta_feed';
  tone: 'relatable' | 'excited' | 'educational' | 'dramatic';
}

export function buildHooksPrompt(input: ProductInput): string {
  return `
Generate 5 scroll-stopping hooks for this product. Each hook must use a DIFFERENT
psychological trigger type.

PRODUCT:
- Name: ${input.name}
- Problem it solves: ${input.coreProblem}
- Result it delivers: ${input.coreResult}
- Target person: ${input.targetPersona}
- Platform: ${input.platform}
- Tone: ${input.tone}

HOOK TYPE REQUIREMENTS (one per hook):
1. Vulnerable confession — creator admits a past mistake or frustration
2. Contrarian claim — challenges what the viewer currently believes/does
3. Specific result — leads with a concrete, credible outcome
4. Direct address — speaks the target persona's exact pain back to them
5. Curiosity gap / tease — creates an information gap that must be closed

RULES:
- Max 15 words per hook
- No brand name in the hook
- Must work as spoken audio AND as on-screen text overlay
- First word should be a strong verb or emotionally charged word

Respond ONLY with this JSON:
{
  "hooks": [
    { "type": "vulnerable_confession", "text": "string", "rationale": "string" },
    { "type": "contrarian_claim", "text": "string", "rationale": "string" },
    { "type": "specific_result", "text": "string", "rationale": "string" },
    { "type": "direct_address", "text": "string", "rationale": "string" },
    { "type": "curiosity_gap", "text": "string", "rationale": "string" }
  ]
}
`.trim();
}
