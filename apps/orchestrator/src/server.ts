import Fastify from "fastify";
import { config } from "./config.js";
import pkg from "../package.json" assert { type: "json" };

const app = Fastify({
  logger: { level: config.env === "development" ? "info" : "warn" }
});

app.get("/healthz", async () => {
  return { status: "ok", version: pkg.version };
});

// graceful shutdown
const close = async () => {
  app.log.info("Shutting down...");
  await app.close();
  process.exit(0);
};
process.on("SIGINT", close);
process.on("SIGTERM", close);

const start = async () => {
  try {
    await app.listen({ port: config.port, host: "0.0.0.0" });
    app.log.info(`orchestrator up on :${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
