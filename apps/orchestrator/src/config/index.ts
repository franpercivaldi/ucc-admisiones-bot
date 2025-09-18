import "dotenv/config";
import { EnvSchema, type Env } from "./schema.js";

type Stage = "dev" | "stg" | "prod";

function deriveStage(env: Env["NODE_ENV"], s?: Stage): Stage {
  if (s) return s;
  if (env === "production") return "prod";
  if (env === "staging") return "stg";
  return "dev";
}

function parseBusinessHours(range: string) {
  const [start, end] = range.split("-");
  return { start, end }; // "HH:MM"
}

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  // Lanzamos error temprano para fallar rápido en despliegues
  console.error("Invalid environment configuration:", parsed.error.flatten());
  process.exit(1);
}

const e = parsed.data;
export const config = {
  nodeEnv: e.NODE_ENV,
  stage: deriveStage(e.NODE_ENV, e.STAGE),
  port: e.PORT,
  timezone: e.TIMEZONE,
  businessHours: parseBusinessHours(e.BUSINESS_HOURS),

  databaseUrl: e.DATABASE_URL,
  redisUrl: e.REDIS_URL,

  meta: {
    appId: e.META_WA_APP_ID,
    token: e.META_WA_TOKEN,
    phoneId: e.META_WA_PHONE_ID,
    verifyToken: e.META_WA_VERIFY_TOKEN,
  },

  rag: {
    enabled: e.RAG_ENABLED,
    opensearchEndpoint: e.OPENSEARCH_ENDPOINT,
    opensearchIndex: e.OPENSEARCH_INDEX,
    s3: { raw: e.S3_BUCKET_RAW, processed: e.S3_BUCKET_PROCESSED },
  },

  get isProd() { return this.stage === "prod"; },
  get isStg() { return this.stage === "stg"; },
  get isDev() { return this.stage === "dev"; },
} as const;
export type AppConfig = typeof config;
