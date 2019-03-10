import * as pino from 'pino'

export let logger = pino({
  level: 'debug',
  prettyPrint: {
    colorize: true
  }
})

export default logger
