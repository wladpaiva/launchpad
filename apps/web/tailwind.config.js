const sharedConfig = require('@repo/tailwind-config/tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  presets: [sharedConfig],
}
