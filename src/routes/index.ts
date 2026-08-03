import type { FastifyInstance } from "fastify";
import type { AppContext } from "../core/context.js";
import { registerHealthRoutes } from "./health.js";

export async function registerRoutes(app: FastifyInstance, ctx: AppContext): Promise<void> {
  await registerHealthRoutes(app, ctx);

  app.get("/", async () => ({
    name: "Marketing Brain",
    message: "Base HTTP shell — MCP servers remain on stdio",
    docs: {
      configuration: "docs/CONFIGURATION.md",
      cursor: "docs/cursor.md",
      health: "/health",
    },
  }));
}
