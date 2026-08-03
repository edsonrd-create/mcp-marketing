import type { FastifyInstance } from "fastify";
import type { AppContext } from "../core/context.js";
import { VERSION } from "../core/version.js";

export async function registerHealthRoutes(app: FastifyInstance, ctx: AppContext): Promise<void> {
  app.get("/health", async () => {
    const services = [
      ctx.googleAds.status(),
      ctx.openAi.status(),
      ctx.mcp.status(),
    ];
    const degraded = services.some((s) => s.status !== "ok");
    return {
      status: degraded ? "degraded" : "ok",
      version: VERSION,
      app: ctx.config.profile.app,
      nodeEnv: ctx.config.env.NODE_ENV,
      services,
    };
  });

  app.get("/ready", async (_request, reply) => {
    const mcp = ctx.mcp.status();
    if (mcp.status === "error") {
      return reply.code(503).send({ ready: false, mcp });
    }
    return { ready: true, mcp };
  });
}
