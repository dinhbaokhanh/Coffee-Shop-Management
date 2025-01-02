const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
    recommendedConfig: js.configs.recommended, // Include recommended rules
});

module.exports = [
    {
        ...compat.config({
            extends: ["standard", "plugin:react/recommended"], // Use an array for multiple extends
            plugins: ["jsx-a11y", "react"],
            env: {
                es2020: true,
                node: true,
                browser: true // Important for React projects
            },
            rules: {
                semi: "error",
                // Add other rules as needed. Example for react hooks:
                'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
                'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
            },
        }),
    },
];