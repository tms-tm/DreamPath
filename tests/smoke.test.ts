import { describe, expect, it } from "vitest";
import { CAREER_PATHS } from "@/types/career";

describe("smoke test", () => {
  it("resolves @/ alias and runs vitest", () => {
    expect(Array.isArray(CAREER_PATHS)).toBe(true);
    expect(CAREER_PATHS.length).toBeGreaterThan(0);
  });
});
