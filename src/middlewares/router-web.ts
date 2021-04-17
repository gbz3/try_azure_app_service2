import Router from '@koa/router'
import Koa from 'koa'
import compose from 'koa-compose'

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
}
