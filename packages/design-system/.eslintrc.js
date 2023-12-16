/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/react-internal.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // this looks important but
    // https://discord.com/channels/818588653005176832/818588653311754243/1184568983681257592
    // project: './tsconfig.lint.json',
  },
}
