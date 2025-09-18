import { config } from "./index.js";

console.log(JSON.stringify({
  ok: true,
  stage: config.stage,
  port: config.port,
  timezone: config.timezone,
  businessHours: config.businessHours,
  ragEnabled: config.rag.enabled,
}, null, 2));
