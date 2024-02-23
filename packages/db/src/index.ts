import {createClient} from '@libsql/client'
import {eq} from 'drizzle-orm'
import {drizzle} from 'drizzle-orm/libsql'
import type {SQLiteUpdateSetSource} from 'drizzle-orm/sqlite-core'

import * as schema from './schema'

export const connection = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

export const db = drizzle(connection, {
  schema,
})

export function updateUser(
  id: string,
  params: SQLiteUpdateSetSource<typeof schema.users>,
) {
  return db
    .update(schema.users)
    .set(params)
    .where(eq(schema.users.id, id))
    .returning({updatedId: schema.users.id})
}
