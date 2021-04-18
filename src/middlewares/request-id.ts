import { v4 } from 'uuid'
import Koa from 'koa'
import { getLogger } from '../modules/logger'

export interface RequestLogger {
      // 必要に応じてメソッド追加
      info: (message: any, ...args: any[]) => void,
      error: (message: any, ...args: any[]) => void,
}

// Koa.Context に logger プロパティを追加
declare module 'koa' {
  interface DefaultContext {
    // logger: {
    //   // 必要に応じてメソッド追加
    //   info: (message: any, ...args: any[]) => void,
    //   error: (message: any, ...args: any[]) => void,
    // }
    logger: RequestLogger
  }
}

const HEADER_NAME = 'x-request-id'

export const mwRequestId = async (ctx: Koa.Context, next: Koa.Next) => {
  const requestId = ctx.request.get(HEADER_NAME) || v4()
  ctx.set(HEADER_NAME, requestId)
  const logger = getLogger()
  ctx.logger = {
    info: (message, ...args) => logger.info(`${message} [${requestId}]`, ...args),
    error: (message, ...args) => logger.info(`${message} [${requestId}]`, ...args),
  }

  await next()
}
