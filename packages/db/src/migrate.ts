import {log} from '@repo/logger'
import {migrate} from 'drizzle-orm/libsql/migrator'

import {connection, db} from './index'

log.info('🚀 Applying database migrations')
// This will run migrations on the database, skipping the ones already applied
await migrate(db, {migrationsFolder: './drizzle'})
// Don't forget to close the connection, otherwise the script will hang
await connection.close()
