import { z, type ZodTypeAny } from "zod";
import { ValidationError } from "../errors/index.js";

export class ToolValidator {
  validate<T extends ZodTypeAny>(schema: T, input: unknown): z.infer<T> {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      throw new ValidationError("Invalid tool arguments", parsed.error.flatten());
    }
    return parsed.data;
  }
}
