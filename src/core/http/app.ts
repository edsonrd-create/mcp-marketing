import Fastify from "fastify";
import { isAppError } from "@mcp-marketing/shared";
import type { AppContext } from "./context.js";
import { registerRoutes } from "../../routes/index.js";

export async function createHttpApp(ctx: AppContext) {
  const app = Fastify({
    logger: false,
  });

  app.setErrorHandler((error, _request, reply) => {
    if (isAppError(error)) {
      ctx.logger.warn({ code: error.code, message: error.message }, error.message);
      return reply.code(error.statusCode).send({
        error: {
          code: error.code,
          message: error.message,
          ...(error.code === "VALIDATION" && error.details !== undefined
            ? { details: error.details }
            : {}),
        },
      });
    }

    ctx.logger.error({ err: error }, "Unhandled error");
    return reply.code(500).send({
      error: {
        code: "INTERNAL",
        message: "Internal server error",
      },
    });
  });

  await registerRoutes(app, ctx);
  return app;
}
