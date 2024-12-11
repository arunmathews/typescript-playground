import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import n from "eslint-plugin-n";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["**/*.snap", "coverage", "lib", "node_modules", "pnpm-lock.yaml"],
	},
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	eslint.configs.recommended,
	n.configs["flat/recommended"],
	{
		extends: tseslint.configs.recommendedTypeChecked,
		files: ["**/*.js", "**/*.ts"],
		rules: {
			"n/no-missing-import": "off",
		},
		languageOptions: {
			parserOptions: {
				projectService: { allowDefaultProject: ["*.config.*s"] },
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		extends: [tseslint.configs.disableTypeChecked],
		files: ["**/*.md/*.ts"],
		rules: {
			"n/no-missing-import": [
				"error",
				{ allowModules: ["typescript-playground"] },
			],
		},
	},
	{
		extends: [vitest.configs.recommended],
		files: ["test/**/*.ts"],
		rules: {
			"@typescript-eslint/no-unsafe-assignment": "off",
		},
	},
);
