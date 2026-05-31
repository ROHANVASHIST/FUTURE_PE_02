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
