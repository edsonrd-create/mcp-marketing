import type { FastifyInstance } from "fastify";
import type { AppContext } from "../core/http/context.js";
import { VERSION } from "../core/http/version.js";

function labelStatus(status: string): string {
  if (status === "online" || status === "ok") return "Online";
  if (status === "offline" || status === "error") return "Offline";
  return "Configuração inválida";
}

export async function registerHealthRoutes(app: FastifyInstance, ctx: AppContext): Promise<void> {
  app.get("/health", async () => {
    const report = await ctx.framework.healthReport();
    const services = [
      ...report.providers.map((p) => ({
        name: p.name,
        status: p.status,
        label: labelStatus(p.status),
        details: p.details,
        tools: p.tools,
      })),
      {
        name: report.openai.name,
        status: report.openai.status,
        label: labelStatus(report.openai.status),
        details: report.openai.details,
      },
      {
        name: report.mcpServer.name,
        status: report.mcpServer.status,
        label: labelStatus(report.mcpServer.status),
        details: report.mcpServer.details,
        tools: report.mcpServer.tools,
      },
    ];

    const hasOffline = services.some((s) => s.status === "offline");
    const hasInvalid = services.some((s) => s.status === "invalid_config");

    return {
      status: hasOffline ? "degraded" : hasInvalid ? "degraded" : "ok",
      version: VERSION,
      app: ctx.config.profile.app,
      nodeEnv: ctx.config.env.NODE_ENV,
      frameworkTools: ctx.framework.toolRegistry.size,
      services,
    };
  });

  app.get("/ready", async (_request, reply) => {
    const report = await ctx.framework.healthReport();
    if (report.mcpServer.status === "offline") {
      return reply.code(503).send({ ready: false, mcp: report.mcpServer });
    }
    return { ready: true, mcp: report.mcpServer };
  });
}
