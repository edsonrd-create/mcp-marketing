import { describe, expect, it } from "vitest";
import { AppError, ErrorCode, isAppError, toErrorMessage } from "./errors.js";

describe("errors", () => {
  it("creates AppError with code and message", () => {
    const error = new AppError({
      code: ErrorCode.VALIDATION,
      message: "Invalid input",
      details: { field: "name" },
    });

    expect(error.message).toBe("Invalid input");
    expect(error.code).toBe(ErrorCode.VALIDATION);
    expect(error.details).toEqual({ field: "name" });
    expect(isAppError(error)).toBe(true);
  });

  it("identifies non-AppError values", () => {
    expect(isAppError(new Error("x"))).toBe(false);
    expect(isAppError("x")).toBe(false);
  });

  it("converts errors to messages", () => {
    expect(toErrorMessage(new AppError({ code: ErrorCode.AUTH, message: "Denied" }))).toBe(
      "Denied",
    );
    expect(toErrorMessage(new Error("boom"))).toBe("boom");
    expect(toErrorMessage("plain")).toBe("plain");
    expect(toErrorMessage(42)).toBe("Unknown error");
  });
});
