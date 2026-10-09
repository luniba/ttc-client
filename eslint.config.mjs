import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "max-lines": [
        "warn",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "warn",
        { max: 80, skipBlankLines: true, skipComments: true },
      ],
      "react/no-danger": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["**/components/ui/**", "**/content/**"],
    rules: {
      "max-lines": [
        "error",
        { max: 250, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ["**/components/ui/**", "**/content/**"],
    rules: { "max-lines": "off", "max-lines-per-function": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
])
