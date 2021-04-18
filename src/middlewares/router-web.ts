import Router from '@koa/router'
import Koa from 'koa'
import compose from 'koa-compose'
import { RequestLogger } from './request-id'
import http2 from 'http2'

// see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
const RouterWeb = new Router<Koa.DefaultState, Koa.Context>()
  .get('/', root)
  .post('/', request)
  .get('/room/dummy', async ctx => await ctx.render('room'))  // TODO dummy

export const mwRouterWeb = compose([RouterWeb.routes(), RouterWeb.allowedMethods()])

async function root(ctx: Koa.Context) {
  ctx.logger.info(`from @koa/router.`)
  await ctx.render('index')
}

/** 利用申込 */
async function request(ctx: Koa.Context) {
  ctx.logger.info(`body=${JSON.stringify(ctx.request.body)}`)
  await http2Post(ctx.logger, new URL(`https://www.google.com/recaptcha/api/siteverify`), { secret: process.env.RECAPTCHA_SECRET, response: ctx.request.body['recaptcha-token'] })
}

function http2Post(logger: RequestLogger, url: URL, body: object = {}) {
  return new Promise<void>((resolve, reject) => {
    const client = http2.connect(url.origin)
    const buffer = Buffer.from(JSON.stringify(body), 'utf8')
    client.on('error', err => { logger.error(err); client.close(); reject(err); })
    const req = client.request({
      [http2.constants.HTTP2_HEADER_SCHEME]: 'https',
      [http2.constants.HTTP2_HEADER_METHOD]: http2.constants.HTTP2_METHOD_POST,
      [http2.constants.HTTP2_HEADER_PATH]: url.pathname,
      [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: 'application/json',
      [http2.constants.HTTP2_HEADER_CONTENT_LENGTH]: buffer.length,
    })
    req.on('error', err => reject(err))
    req.setEncoding('utf8')
    let data = ''
    req.on('data', chunk => data += chunk)
    req.write(buffer)
    req.end()
    req.on('end', () => {
      client.close()
      resolve()
    })
  })
}
