import type {db as DbClient} from '@repo/db'
import {beforeEach} from 'vitest'
import {mockDeep, mockReset} from 'vitest-mock-extended'

beforeEach(() => {
  mockReset(db)
})

const db = mockDeep<typeof DbClient>()
export {db}
