// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

const importPlugin = (await import("eslint-plugin-import")).default;

export default tseslint.config(
  { ignores: ["**/dist/**", "**/node_modules/**"] },

  // ✅ preset sin type-check (simple y estable por ahora)
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "import/order": [
        "error",
        { "newlines-between": "always", alphabetize: { order: "asc" } }
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  }
);
