import {Logtail} from '@logtail/node'
import {LogtailTransport} from '@logtail/winston'
import winston from 'winston'

// Create a Winston logger - passing in the Logtail transport
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
  /**
   * The Winston logger instance.
   * If a `LOGTAIL_SOURCE_TOKEN` environment variable is set, the logger will
   * also send logs to Logtail.
   */
  log,
}
