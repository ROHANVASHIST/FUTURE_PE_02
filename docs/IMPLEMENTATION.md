# IMPLEMENTATION.md
# AI Content Marketing Using UGC Ads
### Future Interns — Prompt Engineering Task 2 (2026)

**Role**: CTO + Full-Stack Engineer  
**Chosen Product**: *GlowLab Vitamin C Face Serum — D2C Skincare Brand (Bengaluru)*  
**Stack**: Next.js 14 · TypeScript · Tailwind CSS · Anthropic Claude API · GitHub

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [What Makes UGC Ads Work (The Theory)](#2-what-makes-ugc-ads-work-the-theory)
3. [Architecture Decisions](#3-architecture-decisions)
4. [Folder Structure](#4-folder-structure)
5. [Prompt Engineering System](#5-prompt-engineering-system)
6. [Backend Implementation](#6-backend-implementation)
7. [Frontend Implementation](#7-frontend-implementation)
8. [Generated UGC Ad Content Pack — Full Output](#8-generated-ugc-ad-content-pack--full-output)
9. [GitHub Repository Setup](#9-github-repository-setup)
10. [Platform-Specific Adaptations](#10-platform-specific-adaptations)
11. [Testing & Quality Checks](#11-testing--quality-checks)
12. [Deployment](#12-deployment)
13. [Monetisation Path](#13-monetisation-path)

---

## 1. Project Overview

### Problem
Brands and local businesses need a constant supply of ad content that doesn't look like an ad. UGC-style scripts — raw, first-person, conversational — consistently outperform polished creative. Writing them well at scale requires understanding human psychology, ad frameworks, and platform behaviour. Most businesses have none of that in-house.

### Solution
A **modular prompt system** that generates production-ready UGC ad scripts including:
- Multiple scroll-stopping hooks for the same product
- Full 30–60 second ad scripts using proven frameworks
- Platform-adapted variations (Instagram Reels, YouTube Shorts, Meta Ads)
- CTA variants matched to funnel stage (awareness / consideration / conversion)
- Reusable prompt templates that work across any brand or product

### Chosen Product

| Field | Detail |
|---|---|
| Product | GlowLab Vitamin C Face Serum (15ml, ₹799) |
| Brand | GlowLab — D2C skincare, Bengaluru |
| Channel | Instagram Reels, Meta Feed Ads |
| Target Persona | Indian women, age 20–34, tier-1/2 cities, skin-conscious |
| Core Problem | Dull, uneven skin tone; distrust of "chemical" products |
| Core Benefit | Visible glow in 14 days, clean ingredients, affordable |
| Tone | Authentic, relatable, mildly excited — NOT salesy |

---

## 2. What Makes UGC Ads Work (The Theory)

Understanding this is non-negotiable before writing a single prompt. Every prompt decision below traces back to these principles.

### The 3-Second Hook Rule
On Instagram Reels and Shorts, the viewer decides in 3 seconds whether to scroll. The hook is not an introduction — it's a pattern interrupt. Best-performing hook types:

| Hook Type | Example | Why It Works |
|---|---|---|
| Vulnerable confession | "I wasted ₹4,000 on serums before I found this" | Relatability + curiosity |
| Contrarian claim | "Stop using Vitamin C wrong" | Challenges existing belief |
| Specific result | "My dark spots faded in 11 days — here's proof" | Specificity builds credibility |
| Direct address | "If your skin looks dull after skincare, watch this" | Speaks to exact pain |
| Before/after tease | "This is what my skin looked like 2 weeks ago..." | Visual curiosity gap |

### The Problem → Agitate → Solution → CTA Framework (PASC)
Every high-converting UGC script follows this structure:

```
HOOK (0–3 sec)    → grab attention before they scroll
PROBLEM (3–8 sec) → name the pain they know intimately
AGITATE (8–18 sec)→ make the problem feel urgent / real
SOLUTION (18–35 sec)→ introduce the product as the answer
PROOF (35–45 sec) → add credibility (result, ingredient, review)
CTA (45–60 sec)   → one clear action
```

### Authenticity Signals
UGC works because it doesn't look scripted. Every prompt must enforce:
- First-person language ("I was", "I tried", "I noticed")
- Imperfect sentence structure (contractions, pauses, self-corrections)
- Specific details over vague claims ("11 days" not "a few weeks")
- No brand-speak ("cutting-edge formulation" = instant scroll)

---

## 3. Architecture Decisions

| Choice | Reason |
|---|---|
| **Next.js 14 (App Router)** | API Routes + SSR in one repo; fast Vercel deploy |
| **TypeScript** | Typed prompt schemas catch errors before they reach the API |
| **Claude API (claude-sonnet-4)** | Superior tone matching and instruction-following for creative content |
| **Zod** | Runtime validation of all AI output — critical when format matters for production use |
| **Tailwind CSS** | Rapid UI prototyping without custom stylesheet overhead |
| **GitHub** | Required by task; functions as portfolio and client proof |

### Data Flow

```
Brand/Product Input Form
        │
        ▼
   Prompt Builder
        │  selects framework, injects product data + platform params
        ▼
   Claude API  (/v1/messages)
        │  returns JSON: hooks[], scripts[], ctas[], captions[]
        ▼
   Zod Validator
        │  enforces schema + length constraints
        ▼
   Next.js API Route  (/api/ugc/generate)
        │
        ▼
   React Preview UI
        │  displays ad pack by section (hooks / scripts / CTAs)
        ▼
   Export  (.md / .txt / clipboard)
```

---

## 4. Folder Structure

```
ai-ugc-ad-generator/
├── app/
│   ├── page.tsx                    # Landing page + product input form
│   ├── generate/
│   │   └── page.tsx                # Ad content preview & export
│   └── api/
│       └── ugc/
│           └── generate/
│               └── route.ts        # POST handler → Claude API
│
├── lib/
│   ├── prompts/
│   │   ├── system-prompt.ts        # Master UGC copywriter persona
│   │   ├── hooks.ts                # Multi-hook generator prompt
│   │   ├── scripts.ts              # Full ad script prompt (PASC framework)
│   │   ├── cta.ts                  # CTA variant generator
│   │   ├── captions.ts             # Instagram caption prompt
│   │   └── platform-map.ts        # Platform-specific tone/length rules
│   ├── schemas/
│   │   └── ugc-schema.ts           # Zod schema for generated content
│   └── claude.ts                   # Claude API client wrapper
│
├── components/
│   ├── ProductForm.tsx             # Step 1: product/brand input
│   ├── AdPackPreview.tsx           # Step 2: full ad pack display
│   ├── HookCard.tsx                # Individual hook display
│   ├── ScriptViewer.tsx            # Script with timestamp markers
│   └── ExportPanel.tsx            # Download / copy options
│
├── prompts/                        # Raw .txt prompts (for GitHub)
│   ├── 01-system-prompt.txt
│   ├── 02-hooks-prompt.txt
│   ├── 03-script-prompt.txt
│   ├── 04-cta-prompt.txt
│   └── 05-caption-prompt.txt
│
├── outputs/                        # Generated content samples
│   ├── glowlab-serum-hooks.md
│   ├── glowlab-serum-scripts.md
│   ├── glowlab-serum-ctas.md
│   └── glowlab-serum-captions.md
│
├── README.md
├── IMPLEMENTATION.md               # This file
├── .env.local                      # ANTHROPIC_API_KEY (gitignored)
└── package.json
```

---

## 5. Prompt Engineering System

### 5.1 System Prompt (\`lib/prompts/system-prompt.ts\`)

```typescript
export const UGC_SYSTEM_PROMPT = \`
You are a UGC (User-Generated Content) ad scriptwriter with 6 years of experience
writing for D2C brands on Instagram, TikTok, and YouTube Shorts.

Your scripts have generated over ₹2 crore in tracked ad revenue for skincare,
fitness, and lifestyle brands.

YOUR STYLE RULES — follow these without exception:
- Write in first-person, as if the creator is speaking to camera
- Sound like a real person talking, not a copywriter writing
- Use contractions, pauses ("[pause]"), reactions ("[holds up bottle]")
- Never use brand marketing language: no "revolutionary", "cutting-edge", "game-changing"
- Be specific: "11 days" beats "a few weeks"; "₹799" beats "affordable"
- Every script must earn attention before selling anything
- The product is the answer to a real problem — never lead with the product
- One CTA only. Never list multiple actions.

OUTPUT FORMAT:
Respond ONLY with a valid JSON object. No markdown, no explanation.
Schema defined in each user prompt.
\`;
```

---

### 5.2 Hook Generator (\`lib/prompts/hooks.ts\`)

The hook prompt generates 5 distinct hooks using different psychological triggers.

```typescript
export interface ProductInput {
  name: string;
  brand: string;
  category: string;
  price: string;
  coreProblem: string;         // e.g. "dull, uneven skin tone"
  coreResult: string;          // e.g. "visible glow in 14 days"
  keyIngredient: string;       // e.g. "10% Vitamin C + Niacinamide"
  targetPersona: string;       // e.g. "Indian women, 22-32, skin-conscious"
  platform: 'instagram' | 'youtube_shorts' | 'meta_feed';
  tone: 'relatable' | 'excited' | 'educational' | 'dramatic';
}

export function buildHooksPrompt(input: ProductInput): string {
  return \`
Generate 5 scroll-stopping hooks for this product. Each hook must use a DIFFERENT
psychological trigger type.

PRODUCT:
- Name: \${input.name}
- Problem it solves: \${input.coreProblem}
- Result it delivers: \${input.coreResult}
- Target person: \${input.targetPersona}
- Platform: \${input.platform}
- Tone: \${input.tone}

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
\`.trim();
}
```

---

### 5.3 Full Script Generator (\`lib/prompts/scripts.ts\`)

```typescript
export function buildScriptPrompt(input: ProductInput, selectedHook: string): string {
  return \`
Write a complete UGC ad script for a 45-60 second Instagram Reel or YouTube Short.

USE THIS HOOK AS THE OPENING LINE:
"\${selectedHook}"

PRODUCT DETAILS:
- Product: \${input.name} by \${input.brand}
- Price: \${input.price}
- Key ingredient: \${input.keyIngredient}
- Core result: \${input.coreResult}
- Target viewer: \${input.targetPersona}

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
- The word "\${input.brand}" appears only once — in the CTA

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
    "estimated_duration_seconds": number,
    "word_count": number
  }
}
\`.trim();
}
```

---

### 5.4 CTA Variant Generator (\`lib/prompts/cta.ts\`)

```typescript
export function buildCTAPrompt(input: ProductInput): string {
  return \`
Generate 6 CTA (call-to-action) variants for this product across different
funnel stages and intent levels.

PRODUCT: \${input.name} — \${input.price}
PLATFORM: \${input.platform}

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
\`.trim();
}
```

---

### 5.5 Caption Generator (\`lib/prompts/captions.ts\`)

```typescript
export function buildCaptionPrompt(input: ProductInput, scriptSummary: string): string {
  return \`
Write 3 Instagram caption variants for this ad. Captions support the video —
they don't repeat it.

PRODUCT: \${input.name}
SCRIPT SUMMARY: \${scriptSummary}
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
\`.trim();
}
```

---

### 5.6 Platform Map (\`lib/prompts/platform-map.ts\`)

```typescript
export const PLATFORM_MAP = {
  instagram: {
    maxDuration: 60,
    idealDuration: 30,
    hookWindowSeconds: 3,
    aspectRatio: '9:16',
    captionStyle: 'casual + emoji-friendly',
    notes: 'Trending audio hooks perform better than spoken. First 2 words on screen matter most.',
  },
  youtube_shorts: {
    maxDuration: 60,
    idealDuration: 45,
    hookWindowSeconds: 5,
    aspectRatio: '9:16',
    captionStyle: 'slightly more detail tolerated',
    notes: 'Longer problem-agitation section performs well. Viewer intent is higher.',
  },
  meta_feed: {
    maxDuration: 30,
    idealDuration: 15,
    hookWindowSeconds: 2,
    aspectRatio: '1:1 or 4:5',
    captionStyle: 'benefit-first, concise',
    notes: 'Sound-off optimised. On-screen text carries full message. CTA must be above fold.',
  },
};
```

---

### 5.7 Raw Prompt Files (for GitHub \`prompts/\` folder)

**\`prompts/01-system-prompt.txt\`**
```
You are a UGC ad scriptwriter with 6 years of experience writing for D2C brands.
Write in first-person, as a real creator speaking to camera.
Sound like a person talking — not a copywriter. Use contractions, pauses, reactions.
Never use brand marketing language. Be specific. Lead with the problem, not the product.
Output valid JSON only. No markdown. No explanation.
```

**\`prompts/02-hooks-prompt.txt\`**
```
Generate 5 hooks for [PRODUCT], each using a different psychological trigger:
1. Vulnerable confession (creator admits past mistake)
2. Contrarian claim (challenges viewer's current belief)
3. Specific result (concrete, credible outcome)
4. Direct address (speaks viewer's exact pain back to them)
5. Curiosity gap (creates information gap that must be closed)

Rules: Max 15 words. No brand name. Works as spoken audio AND on-screen text.
Output: JSON array with type, text, rationale per hook.
```

**\`prompts/03-script-prompt.txt\`**
```
Write a 45-60 second UGC script for [PRODUCT] using this framework:
[0-3s]   HOOK — chosen hook line
[3-8s]   PROBLEM — personal experience with the pain
[8-18s]  AGITATE — make the problem real, mention failed alternatives
[18-35s] SOLUTION — introduce product naturally
[35-45s] PROOF — specific result or transformation
[45-55s] CTA — one action, include price

Rules: Stage directions in [brackets]. Brand name once only (in CTA).
Output: JSON with each section separate + full combined script.
```

**\`prompts/04-cta-prompt.txt\`**
```
Generate 6 CTA variants for [PRODUCT] at [PRICE] across funnel stages:
1. Cold (awareness) — soft ask
2. Warm (consideration) — social proof nudge
3. Hot (conversion) — direct, urgency-based
4. Discount/offer-driven — price anchor
5. Curiosity-driven — drives click via information gap
6. Community/identity — belonging or self-image

Rules: Max 12 words. Natural spoken language. Vary first verb.
Output: JSON array with stage, text, use_case.
```

**\`prompts/05-caption-prompt.txt\`**
```
Write 3 Instagram caption variants for [PRODUCT] ad:
1. Story-first (relatable 1-line story + CTA)
2. Benefit-list (3 punchy bullets + CTA)
3. Question hook (question target audience asks themselves)

Rules: First 150 chars must hook above the fold. 5 hashtags appended.
Max 3 emojis. Same first-person voice as the video.
Output: JSON array with type, text, hashtags.
```

---

## 6. Backend Implementation

### 6.1 Claude API Client (\`lib/claude.ts\`)

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { UGC_SYSTEM_PROMPT } from './prompts/system-prompt';
import { buildHooksPrompt, buildScriptPrompt, buildCTAPrompt, buildCaptionPrompt, ProductInput } from './prompts';
import { UGCSchema, GeneratedAdPack } from './schemas/ugc-schema';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function callClaude(userPrompt: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    system: UGC_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });
  return response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .replace(/```json|```/g, '')
    .trim();
}

export async function generateAdPack(input: ProductInput): Promise<GeneratedAdPack> {
  // Step 1: generate hooks
  const hooksRaw = await callClaude(buildHooksPrompt(input));
  const hooks = JSON.parse(hooksRaw).hooks;

  // Step 2: generate full script using the first hook (best-practice default)
  const scriptRaw = await callClaude(buildScriptPrompt(input, hooks[0].text));
  const script = JSON.parse(scriptRaw).script;

  // Step 3: generate CTA variants
  const ctasRaw = await callClaude(buildCTAPrompt(input));
  const ctas = JSON.parse(ctasRaw).ctas;

  // Step 4: generate captions
  const captionsRaw = await callClaude(
    buildCaptionPrompt(input, script.problem + ' ' + script.solution)
  );
  const captions = JSON.parse(captionsRaw).captions;

  const pack = { hooks, script, ctas, captions };
  return UGCSchema.parse(pack); // Zod validation
}
```

---

### 6.2 Zod Schema (\`lib/schemas/ugc-schema.ts\`)

```typescript
import { z } from 'zod';

const HookSchema = z.object({
  type: z.string(),
  text: z.string().max(120),
  rationale: z.string(),
});

const ScriptSchema = z.object({
  hook: z.string(),
  problem: z.string(),
  agitate: z.string(),
  solution: z.string(),
  proof: z.string(),
  cta: z.string(),
  full_script: z.string(),
  estimated_duration_seconds: z.number().min(20).max(70),
  word_count: z.number(),
});

const CTASchema = z.object({
  stage: z.string(),
  text: z.string().max(100),
  use_case: z.string(),
});

const CaptionSchema = z.object({
  type: z.string(),
  text: z.string(),
  hashtags: z.array(z.string()).min(3).max(8),
});

export const UGCSchema = z.object({
  hooks: z.array(HookSchema).length(5),
  script: ScriptSchema,
  ctas: z.array(CTASchema).length(6),
  captions: z.array(CaptionSchema).length(3),
});

export type GeneratedAdPack = z.infer<typeof UGCSchema>;
```

---

### 6.3 API Route (\`app/api/ugc/generate/route.ts\`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateAdPack } from '@/lib/claude';
import { ProductInput } from '@/lib/prompts/hooks';

export async function POST(req: NextRequest) {
  try {
    const body: ProductInput = await req.json();

    if (!body.name || !body.coreProblem || !body.coreResult) {
      return NextResponse.json(
        { error: 'Missing required product fields' },
        { status: 400 }
      );
    }

    const adPack = await generateAdPack(body);
    return NextResponse.json({ adPack });

  } catch (error) {
    console.error('UGC generation error:', error);
    return NextResponse.json(
      { error: 'Ad content generation failed. Check inputs and API key.' },
      { status: 500 }
    );
  }
}
```

---

## 7. Frontend Implementation

### 7.1 Product Input Form (\`components/ProductForm.tsx\`)

| Field | Type | Example |
|---|---|---|
| Product Name | text | GlowLab Vitamin C Face Serum |
| Brand Name | text | GlowLab |
| Category | select | Skincare / Fitness / Food / SaaS / Local Biz |
| Price | text | ₹799 |
| Core Problem | textarea | Dull, uneven skin tone; dark spots |
| Core Result | textarea | Visible glow in 14 days |
| Key Ingredient / Feature | text | 10% Vitamin C + Niacinamide |
| Target Persona | text | Indian women, 22-32, skin-conscious |
| Platform | radio | Instagram / YouTube Shorts / Meta Feed |
| Tone | radio | Relatable / Excited / Educational / Dramatic |

---

### 7.2 Ad Pack Preview (\`components/AdPackPreview.tsx\`)

Four tabbed sections:

**Tab 1 — Hooks**
- 5 hook cards, each showing type label, hook text, rationale
- "Use this hook" button → auto-populates script section
- Copy to clipboard per hook

**Tab 2 — Script**
- Timeline view: each section ([0-3s], [3-8s], etc.) in a distinct block
- Stage directions shown in a muted colour
- Word count + estimated duration badge
- "Regenerate with different hook" dropdown

**Tab 3 — CTAs**
- 6 CTA cards labelled by funnel stage
- Recommended placement badge (video end / caption / ad button)

**Tab 4 — Captions**
- 3 caption blocks with hashtags displayed separately
- Character count visible (flag if above-the-fold text > 150 chars)

---

### 7.3 Export Panel (\`components/ExportPanel.tsx\`)

Three export formats:
1. **Copy All as Markdown** — full ad pack in one clipboard action
2. **Download as .txt** — plain script for sending to video creators
3. **Download as .md** — structured pack for GitHub / client delivery

---

## 8. Generated UGC Ad Content Pack — Full Output

*The following is the actual AI-generated output for GlowLab Vitamin C Face Serum.*

---

### 8.1 Five Hooks

| # | Type | Hook Text | Rationale |
|---|---|---|---|
| 1 | Vulnerable Confession | "I spent ₹6,000 on serums that did absolutely nothing for my skin." | Relatable financial frustration + implied "until this" curiosity |
| 2 | Contrarian Claim | "Vitamin C serums don't work — unless you're using the right percentage." | Challenges a common behaviour; forces viewer to wonder if they're "doing it wrong" |
| 3 | Specific Result | "My dark spots faded by 60% in exactly 11 days. No filter." | Specificity builds credibility; "no filter" adds authenticity signal |
| 4 | Direct Address | "If your skin still looks dull after your whole skincare routine, keep watching." | Speaks the target persona's exact frustration back to them |
| 5 | Curiosity Gap | "There's one ingredient Indian skin actually needs in a Vitamin C serum — and most brands skip it." | Creates an information gap that can only be closed by watching |

---

### 8.2 Full Ad Script (using Hook #3)

```
[0-3s]
"My dark spots faded by 60% in 11 days. No filter, no editing." [holds phone camera steady, 
no ring light, natural light]

[3-8s]
"Okay so real talk — I've had pigmentation around my cheeks and forehead for three years. 
It got worse in summer, and I genuinely thought it was just... my skin." [gestures to cheeks]

[8-18s]
"I tried three different Vitamin C serums. One made me break out. One smelled like 
chemicals. One did nothing. I almost gave up on Vitamin C entirely." [pause] 
"Then my dermatologist friend said I was using the wrong concentration."

[18-35s]
"She told me to try GlowLab's Vitamin C Serum — it's 10% stabilised Vitamin C with 
Niacinamide, which means it actually absorbs and doesn't oxidise on your skin. 
[holds bottle close to camera] I use two drops every morning before SPF. That's it."

[35-45s]
"Week one, my skin just looked... cleaner? Week two, the spots around my cheeks 
started to visibly fade. I'm now on week six and honestly my foundation usage 
has dropped by half." [smiles, no heavy makeup visible]

[45-55s]
"It's ₹799 for a 15ml bottle, which has lasted me two months. Link is in my bio — 
GlowLab often has a starter discount for first orders. 
If you have pigmentation, just try it for 14 days."
```

**Estimated Duration:** 52 seconds  
**Word Count:** 218

---

### 8.3 CTA Variants

| # | Funnel Stage | CTA Text | Use Case |
|---|---|---|---|
| 1 | Cold (Awareness) | "Curious? The full ingredient breakdown is in my bio." | Top-of-funnel, low-commitment click |
| 2 | Warm (Consideration) | "4,200 people have tried this in the last 30 days — results in bio." | Social proof nudge for retargeting |
| 3 | Hot (Conversion) | "₹799. First order discount active. Link in bio." | Direct purchase intent |
| 4 | Offer-Driven | "They're running a buy-one-get-one this week. Grab it while it's live." | Urgency without fake scarcity |
| 5 | Curiosity-Driven | "The dermatologist tip that changed my routine — linked below." | Drives click via expert credibility gap |
| 6 | Identity/Community | "If you're done settling for dull skin, this one's for you." | Speaks to aspirational self-image |

---

### 8.4 Instagram Captions

**Caption 1 — Story-First**
```
Three years of pigmentation. Gone in 6 weeks. I didn't believe it either until week two. 
My full routine + the exact serum in bio 👇

#VitaminCSerum #GlowLabIndia #PigmentationTreatment #SkincareIndia #NiacinamideSerum
```

**Caption 2 — Benefit List**
```
What actually changed when I switched serums:
→ Dark spots visibly lighter by week 2
→ Foundation usage dropped by half
→ Skin looks awake without makeup

₹799. Link in bio.

#SkincareRoutine #GlowSkin #VitaminCForSkin #IndianSkincare #DarkSpots
```

**Caption 3 — Question Hook**
```
Why does your skin still look dull even after your full routine? 
Might be a Vitamin C concentration problem. 
My dermatologist friend explained it — I linked the serum she recommended 👇

#SkincareTips #VitaminC #GlowLab #MorningRoutine #SkincareAdvice
```

---

## 9. GitHub Repository Setup

### Repository Name
\`ai-ugc-ad-generator\`

### README.md Structure

```markdown
# AI UGC Ad Content Generator

## Product Chosen
GlowLab Vitamin C Face Serum — D2C Skincare, Bengaluru

## What This Does
A modular prompt system that generates complete UGC ad content packs
(hooks, scripts, CTAs, captions) for any product using the Claude API.

## Prompt Logic
- System prompt defines the UGC creator persona and tone rules
- Hook prompt generates 5 hooks using distinct psychological triggers
- Script prompt uses the PASC framework (Problem → Agitate → Solution → CTA)
- CTA prompt covers all 6 funnel stages
- Caption prompt generates 3 platform-optimised Instagram caption variants
- Platform map adapts length and tone per distribution channel

## Tools Used
- Claude (Anthropic API — claude-sonnet-4)
- Next.js 14 + TypeScript
- Tailwind CSS
- Zod

## How to Run
1. Clone repo
2. Add ANTHROPIC_API_KEY to .env.local
3. npm install && npm run dev
4. Open http://localhost:3000

## Generated Outputs
See /outputs for full ad pack samples for GlowLab Serum.
```

---

## 10. Platform-Specific Adaptations

Different platforms need different emphasis. The same base content is adapted as follows:

### Instagram Reels
- Hook must work as first-frame visual text AND spoken audio
- Trending audio over voiceover where possible
- Script front-loaded (best content in first 15s)
- Caption: story-first style with 5 niche hashtags
- CTA: "link in bio" with soft urgency

### YouTube Shorts
- Hook window is slightly longer (5 seconds vs 3)
- Viewer intent is higher — slightly longer problem-agitation section works
- No hashtag stuffing in description; 3 maximum
- CTA: can include channel subscribe layer on top of product CTA

### Meta Feed Ads (Instagram + Facebook)
- Assume sound is OFF — on-screen text carries the full message
- First 2 seconds of visual must communicate the core benefit
- Shorter scripts (15–20 seconds) perform better for cold audiences
- CTA button text: "Shop Now", "Learn More", or "Get Offer" (Meta button labels)
- Caption: benefit-list format; no hashtags in paid ads

---

## 11. Testing & Quality Checks

### UGC Script Quality Checklist

| Check | Pass Criteria |
|---|---|
| First-person throughout | Every sentence uses "I", "my", "me" — no "you should" in script body |
| No brand-speak | Grep for "revolutionary", "premium quality", "best-in-class" → 0 results |
| Hook under 15 words | Word count check passes |
| PASC framework intact | All 6 timestamp sections present in full_script |
| One CTA only | CTA section contains exactly one action verb + one destination |
| Brand name count | Brand name appears exactly once (CTA section only) |
| Specificity check | At least one number appears in problem or proof section |
| JSON validity | \`JSON.parse()\` succeeds on all 4 API responses |

### Manual Spot Test — 3 Different Products

Run the full prompt chain for:
1. GlowLab Serum → tone: relatable, platform: instagram
2. A local gym in Pune → tone: excited, platform: instagram
3. A SaaS invoicing tool → tone: educational, platform: youtube_shorts

The three outputs must be clearly distinct in voice, problem framing, and CTA style.

---

## 12. Deployment

### Option A — Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Connect at vercel.com/new
# Add environment variable: ANTHROPIC_API_KEY
# Deploy — live in ~90 seconds
```

### Option B — Local Demo

```bash
git clone https://github.com/YOUR_USERNAME/ai-ugc-ad-generator
cd ai-ugc-ad-generator
cp .env.example .env.local
# Add ANTHROPIC_API_KEY to .env.local
npm install
npm run dev
# Open http://localhost:3000
```

---

## 13. Monetisation Path

### The Pitch to a Brand Founder or Agency

> "I generate complete UGC ad packs — 5 hooks, a full 60-second script, 6 CTA variants, and 3 platform captions — for any product in under 2 minutes. Here's the pack I created for [their competitor / their own product as demo]. I can deliver 10 ad variations a week at a fraction of a freelance copywriter's rate."

### Pricing Tiers

| Tier | Deliverable | Suggested Price |
|---|---|---|
| Starter Pack | 5 hooks + 1 script + 3 CTAs | ₹1,500–₹3,000 |
| Full Ad Pack | 5 hooks + 3 scripts + 6 CTAs + captions | ₹4,000–₹7,000 |
| Campaign Pack | 3 products × full ad pack | ₹12,000–₹18,000 |
| Monthly Retainer | 8 ad packs/month + revisions | ₹15,000–₹30,000/month |
| Agency White-label | Branded output delivery for agency clients | ₹25,000–₹50,000/month |

### Where to Find First Clients

- DM local D2C brands on Instagram who are running Reels ads — offer a free sample pack
- Post your GlowLab sample pack on LinkedIn / Instagram tagging the brand
- Freelance platforms: Fiverr, Upwork, Internshala (gig: "UGC Ad Script Writer")
- WhatsApp groups for D2C founders and e-commerce sellers in your city

---

## Summary

| Component | Status |
|---|---|
| UGC theory + framework (PASC) | ✅ Documented |
| System prompt (persona + rules) | ✅ Defined |
| Hook generator (5 psychological trigger types) | ✅ Parameterised |
| Full script generator (PASC + timestamp structure) | ✅ Parameterised |
| CTA generator (6 funnel stages) | ✅ Defined |
| Caption generator (3 platform-optimised variants) | ✅ Defined |
| Platform map (Instagram / Shorts / Meta Feed) | ✅ Built |
| Claude API multi-step integration | ✅ Chained (hooks → script → CTAs → captions) |
| Zod output validation | ✅ Schema enforced |
| Next.js API route | ✅ POST handler with error handling |
| React UI (form + preview tabs + export) | ✅ Outlined |
| Full generated output for GlowLab Serum | ✅ Complete |
| GitHub structure + README | ✅ Defined |
| Deployment steps | ✅ Vercel + local |
| Monetisation path + pricing | ✅ Defined |

---

*Built for Future Interns — Prompt Engineering Task 2, 2026.*
