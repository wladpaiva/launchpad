import type {AdapterAccount} from '@auth/core/adapters'
import {createId} from '@paralleldrive/cuid2'
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  unique,
} from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name'),
  email: text('email').unique().notNull(),
  emailVerified: integer('emailVerified', {mode: 'timestamp_ms'}),
  image: text('image'),
  stripeCustomerId: text('stripeCustomerId').unique(),
  // whether the user has an active stripe subscription
  isActive: integer('isActive', {mode: 'boolean'}).default(false),
  // stripe subscription id
  subscriptionId: text('subscriptionId'),
})

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, {onDelete: 'cascade'}),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, {onDelete: 'cascade'}),
  expires: integer('expires', {mode: 'timestamp_ms'}).notNull(),
})

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', {mode: 'timestamp_ms'}).notNull(),
  },
  vt => ({
    compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
  }),
)

export const waitlist = sqliteTable('waitlist', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  slug: text('slug').notNull().unique(),
  title: text('title'),
  description: text('description'),
  pixel: text('pixel'),
})

export const interest = sqliteTable(
  'interest',
  {
    id: text('id')
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    waitlist: text('waitlist')
      .references(() => waitlist.id, {onDelete: 'cascade'})
      .notNull(),
    email: text('email').notNull(),
    emailVerified: integer('emailVerified', {mode: 'timestamp_ms'}),
    createdAt: integer('createdAt', {mode: 'timestamp_ms'})
      .$defaultFn(() => new Date())
      .notNull(),
  },
  t => ({
    unq: unique().on(t.waitlist, t.email),
  }),
)
