module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "object-curly-spacing": ["error", "always"],
    "require-jsdoc": [2, {
      "require": {
        "FunctionDeclaration": false,
        "MethodDefinition": false,
        "ClassDeclaration": false,
      },
    }],
  },
};
