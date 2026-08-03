import type { ZodTypeAny } from "zod";
import { ValidationError, toErrorMessage } from "@mcp-marketing/shared";
import type { Logger } from "../logger/index.js";

export type MiddlewareNext = () => Promise<unknown>;

export interface ToolMiddlewareContext {
  providerId: string;
  toolName: string;
  args: unknown;
  logger: Logger;
}

export type ToolMiddleware = (
  ctx: ToolMiddlewareContext,
  next: MiddlewareNext,
) => Promise<unknown>;

/** Validates tool args with Zod before execution. */
export function validationMiddleware(schema: ZodTypeAny): ToolMiddleware {
  return async (ctx, next) => {
    const parsed = schema.safeParse(ctx.args);
    if (!parsed.success) {
      throw new ValidationError(`Invalid arguments for ${ctx.toolName}`, parsed.error.flatten());
    }
    ctx.args = parsed.data;
    return next();
  };
}

/** Logs start/end/error for each tool call. */
export function loggingMiddleware(): ToolMiddleware {
  return async (ctx, next) => {
    const started = performance.now();
    ctx.logger.info(
      { provider: ctx.providerId, tool: ctx.toolName },
      "middleware_tool_start",
    );
    try {
      const result = await next();
      ctx.logger.info(
        {
          provider: ctx.providerId,
          tool: ctx.toolName,
          ms: Math.round(performance.now() - started),
          status: "ok",
        },
        "middleware_tool_end",
      );
      return result;
    } catch (error) {
      ctx.logger.error(
        {
          provider: ctx.providerId,
          tool: ctx.toolName,
          ms: Math.round(performance.now() - started),
          status: "error",
          error: toErrorMessage(error),
        },
        "middleware_tool_end",
      );
      throw error;
    }
  };
}

/** Compose middlewares around a handler. */
export function composeMiddleware(
  middlewares: ToolMiddleware[],
  handler: () => Promise<unknown>,
  ctx: ToolMiddlewareContext,
): Promise<unknown> {
  let index = -1;
  const dispatch = async (i: number): Promise<unknown> => {
    if (i <= index) {
      throw new Error("next() called multiple times");
    }
    index = i;
    const fn = middlewares[i];
    if (!fn) {
      return handler();
    }
    return fn(ctx, () => dispatch(i + 1));
  };
  return dispatch(0);
}
