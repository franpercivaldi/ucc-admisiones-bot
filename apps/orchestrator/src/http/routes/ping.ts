import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { badRequest } from "../../core/errors.js";

export async function pingRoutes(app: FastifyInstance) {
  app.get("/v1/ping", async (req) => {
    const schema = z.object({ name: z.string().min(1).optional() });
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) throw badRequest("Invalid query", parsed.error.flatten());

    const name = parsed.data.name ?? "world";
    return { ok: true, data: { msg: `pong, ${name}` } };
  });
}
