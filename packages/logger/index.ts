import {Logtail} from '@logtail/node'
import {LogtailTransport} from '@logtail/winston'
import chalk from 'chalk'
import winston from 'winston'

/**
 * The Winston logger instance.
 * If a `LOGTAIL_SOURCE_TOKEN` environment variable is set, the logger will
 * also send logs to Logtail.
 */
const log = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
})

const token = process.env.LOGTAIL_SOURCE_TOKEN
if (token) {
  // Create a Logtail client
  const logtail = new Logtail(token)
  log.add(new LogtailTransport(logtail))
}

export {
  log,
  /**
   * The chalk instance.
   */
  chalk,
}
