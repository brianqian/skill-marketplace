module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-typescript/base", "prettier/@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  rules: {
    "no-console": 0,
    "consistent-return": 1,
    "implicit-arrow-linebreak": 0,
    "comma-dangle": 0,
    indent: 0,
    "object-curly-spacing": 0,
    "no-multiple-empty-lines": 0,
    "arrow-parens": 0
  }
};
