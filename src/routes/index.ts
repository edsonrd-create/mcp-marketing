import type { FastifyInstance } from "fastify";
import type { AppContext } from "../core/http/context.js";
import { registerHealthRoutes } from "./health.js";

export async function registerRoutes(app: FastifyInstance, ctx: AppContext): Promise<void> {
  await registerHealthRoutes(app, ctx);

  app.get("/", async () => ({
    name: "Marketing Brain",
    message: "Core MCP Framework + HTTP shell — MCP servers remain on stdio",
    docs: {
      configuration: "docs/CONFIGURATION.md",
      framework: "docs/CORE_FRAMEWORK.md",
      cursor: "docs/cursor.md",
      health: "/health",
    },
    framework: {
      providers: ctx.framework.providerRegistry.size,
      tools: ctx.framework.toolRegistry.size,
    },
  }));
}
