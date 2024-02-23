import {server} from '@/mocks/node'
import {afterAll, afterEach, beforeAll} from 'vitest'

beforeAll(() =>
  server.listen({
    // prevent network requests during tests to avoid flakiness and improve speed.
    onUnhandledRequest: 'error',
  }),
)
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
