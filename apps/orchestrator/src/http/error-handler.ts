import type { FastifyInstance } from "fastify";
import { AppError } from "../core/errors.js";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, req, reply) => {
    const isApp = err instanceof AppError;
    const status = (isApp ? err.status : (err as any).statusCode) ?? 500;
    const code = isApp ? err.code : ((err as any).code ?? "INTERNAL");
    const message = status >= 500 ? "Internal server error" : (err.message || "Error");
    app.log.error({ err, reqId: req.id }, "request_error");
    reply.status(status).send({
      ok: false,
      error: { code, message },
      request_id: req.id
    });
  });

  app.setNotFoundHandler((req, reply) => {
    reply.status(404).send({
      ok: false,
      error: { code: "NOT_FOUND", message: "Route not found" },
      request_id: req.id
    });
  });
}
