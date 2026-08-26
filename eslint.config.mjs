import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // `.claude/` and `.impeccable/` hold vendored tooling scripts, not project code.
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", ".claude/**", ".impeccable/**"],
  },
];

export default eslintConfig;
