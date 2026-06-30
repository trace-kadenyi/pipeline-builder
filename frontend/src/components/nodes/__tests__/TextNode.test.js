import { extractVariables } from "../TextNode";

// The 'g' flag on VARIABLE_REGEX retains lastIndex between calls.
// Calling extractVariables('') before each test resets it to avoid flaky results.
beforeEach(() => {
  extractVariables("");
});

describe("extractVariables", () => {
  test("returns empty array when no variables present", () => {
    expect(extractVariables("Hello world")).toEqual([]);
  });

  test("extracts a single variable", () => {
    expect(extractVariables("Hello {{city}}")).toEqual(["city"]);
  });

  test("extracts multiple variables", () => {
    expect(extractVariables("{{city}} {{country}}")).toEqual([
      "city",
      "country",
    ]);
  });

  test("does not return duplicates", () => {
    expect(extractVariables("{{city}} and {{city}}")).toEqual(["city"]);
  });

  test("handles spaces inside braces", () => {
    expect(extractVariables("{{ city }}")).toEqual(["city"]);
  });

  test("ignores invalid variable names starting with a number", () => {
    expect(extractVariables("{{123invalid}}")).toEqual([]);
  });

  test("handles empty string", () => {
    expect(extractVariables("")).toEqual([]);
  });
});
