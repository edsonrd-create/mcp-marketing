/**
 * Tool execution logging helpers — always write to stderr when MCP STDIO is active.
 */
export function logToolExecution(
  message: string,
  data?: Record<string, unknown>,
): void {
  const stdioSafe =
    process.env.MCP_STDIO_SAFE === "true" || process.env.MCP_STDIO_SAFE === "1";
  const payload = data ? ` ${JSON.stringify(data)}` : "";
  const line = `${message}${payload}\n`;

  if (stdioSafe) {
    process.stderr.write(line);
    return;
  }

  // Non-stdio contexts (unit tests / HTTP): stderr is still safest for consistency.
  process.stderr.write(line);
}

export async function withToolExecutionLogging<T>(
  toolName: string,
  fn: () => Promise<T>,
): Promise<T> {
  const started = performance.now();
  logToolExecution(`▶ Tool start: ${toolName}`);
  try {
    const result = await fn();
    const ms = Math.round(performance.now() - started);
    const isError =
      Boolean(result) &&
      typeof result === "object" &&
      "isError" in (result as object) &&
      (result as { isError?: boolean }).isError === true;

    if (isError) {
      logToolExecution(`✖ Tool error: ${toolName}`, { ms });
    } else {
      logToolExecution(`✔ Tool ok: ${toolName}`, { ms });
    }
    return result;
  } catch (error) {
    const ms = Math.round(performance.now() - started);
    const errMessage = error instanceof Error ? error.message : String(error);
    logToolExecution(`✖ Tool failed: ${toolName}`, { ms, error: errMessage });
    throw error;
  }
}
