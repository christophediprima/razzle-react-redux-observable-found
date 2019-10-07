module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  settings: {
    react: {
      version: "detect",
    },
    // linkComponents: [
    //   // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
    //   'Hyperlink',
    //   { name: 'Link', linkAttribute: 'to' },
    // ],
  },
  // Este rules.
  rules: {
    "sort-keys": [
      "error",
      "asc",
      { caseSensitive: true, natural: false, minKeys: 2 },
    ],
    // Type is enforced by callers. Not entirely, but it's good enough.
    "@typescript-eslint/explicit-function-return-type": "off",
    // We need underscores for relay/generated/Component_prop.graphql
    "@typescript-eslint/camelcase": "off",
    // Temp fix for import.
    // https://github.com/benmosher/eslint-plugin-import/issues/1285#issuecomment-466212438
    "import/named": "off",
    // Enforce arrow functions only is afaik not possible. But this helps.
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    // Fix for TypeScript.
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    // Fix for TypeScript.
    "react/no-danger": "off",
    // I believe shadowing is a nice language feature.
    "no-shadow": "off",
    "import/prefer-default-export": "off",
    // Because React Native in packages/web is replaced with React Native Web.
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    // We have types.
    "react/prop-types": "off",
    // It's fine.
    "react/no-multi-comp": "off",
    "react/no-unescaped-entities": "off",
    // They are fine sometimes.
    "no-nested-ternary": "off",
    // This is fine.
    "lines-between-class-members": "off",
    // We use it for immer. It should be checked by readonly anyway.
    "no-param-reassign": "off",
    // Irrelevant.
    "no-plusplus": "off",
    "no-return-assign": "off",
    "consistent-return": "off",
    // TSC checks it.
    "@typescript-eslint/no-unused-vars": "off",
    "no-undef": "off",
    "react/jsx-no-undef": "off",
    // React Hooks.
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    // Reconsider, maybe enable later:
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/destructuring-assignment": "off",
    "import/no-cycle": "off",
    "react/jsx-props-no-spreading": "off",
  },
}
