import { ProductInput } from './hooks.js';

export function buildScriptPrompt(input: ProductInput, selectedHook: string): string {
  return `
Write a complete UGC ad script for a 45-60 second Instagram Reel or YouTube Short.

USE THIS HOOK AS THE OPENING LINE:
"${selectedHook}"

PRODUCT DETAILS:
- Product: ${input.name} by ${input.brand}
- Price: ${input.price}
- Key ingredient: ${input.keyIngredient}
- Core result: ${input.coreResult}
- Target viewer: ${input.targetPersona}

SCRIPT FRAMEWORK — follow this structure exactly:
[0-3s]   HOOK — the opening line above, spoken directly to camera
[3-8s]   PROBLEM — name the pain; creator shares personal experience with this problem
[8-18s]  AGITATE — make the problem feel real and frustrating; mention failed alternatives
[18-35s] SOLUTION — introduce the product naturally; what it is, what's in it, how to use it
[35-45s] PROOF — specific result or transformation; mention timeline or ingredient benefit
[45-55s] CTA — single clear action; include price or offer if relevant

FORMATTING RULES:
- Mark each section with its timestamp label: [0-3s], [3-8s], etc.
- Add stage directions in square brackets: [holds bottle up], [pause], [gestures to skin]
- Write exactly as it would be spoken — contractions, natural rhythm
- No section longer than 3 sentences
- The word "${input.brand}" appears only once — in the CTA

Respond ONLY with this JSON:
{
  "script": {
    "hook": "string",
    "problem": "string",
    "agitate": "string",
    "solution": "string",
    "proof": "string",
    "cta": "string",
    "full_script": "string (all sections combined with timestamp labels)",
    "estimated_duration_seconds": 45,
    "word_count": 150
  }
}
`.trim();
}
