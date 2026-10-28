import vitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";
import tailwindcss from "eslint-plugin-better-tailwindcss";
import prettier from "eslint-config-prettier/flat";

import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
    ...vitals,
    ...typescript,
    {
        files: ["**/*.{ts,tsx}"],
        rules: {
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-import-type-side-effects": "error",
            "@next/next/no-img-element": "off"
        }
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: { "better-tailwindcss": tailwindcss },
        settings: { "better-tailwindcss": { entryPoint: "app/globals.css" } },
        rules: { "better-tailwindcss/enforce-canonical-classes": "warn" }
    },
    prettier,
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);

export default eslintConfig;
