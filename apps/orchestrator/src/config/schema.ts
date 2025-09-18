import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "staging", "production"]).default("development"),
  STAGE: z.enum(["dev", "stg", "prod"]).optional(),
  PORT: z.coerce.number().int().positive().default(3000),

  TIMEZONE: z.string().default("America/Argentina/Cordoba"),
  BUSINESS_HOURS: z
    .string()
    .regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, "Formato HH:MM-HH:MM")
    .default("08:00-16:00"),

  // Conexiones (opcionales por ahora; se exigirán en fases posteriores)
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().optional(),

  // WhatsApp (Meta) – opcionales en Fase 0
  META_WA_APP_ID: z.string().optional(),
  META_WA_TOKEN: z.string().optional(),
  META_WA_PHONE_ID: z.string().optional(),
  META_WA_VERIFY_TOKEN: z.string().optional(),

  // Flags RAG (se usarán en Fase 2)
  RAG_ENABLED: z.coerce.boolean().default(false),
  OPENSEARCH_ENDPOINT: z.string().optional(),
  OPENSEARCH_INDEX: z.string().optional(),
  S3_BUCKET_RAW: z.string().optional(),
  S3_BUCKET_PROCESSED: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;
