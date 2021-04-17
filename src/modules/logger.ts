import log4js from 'log4js'

export const getLogger = (category: 'context' = 'context') => log4js.configure({
  appenders: {
    'ContextAppender': {
      type: 'stdout',
      layout: { type: 'pattern', pattern: `[%d] [%p] : %m` },
    },
  },
  categories: {
    default: { appenders: ['ContextAppender'], level: 'debug' },
    context: { appenders: ['ContextAppender'], level: 'debug' },
  }
}).getLogger(category)
