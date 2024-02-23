import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  driver: 'turso',
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
})
