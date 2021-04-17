import Koa from 'koa'

// Koa2 サーバ初期設定
const app = new Koa()

// ミドルウェア設定
import mwServ from 'koa-static'
import { mwRequestId } from './middlewares/request-id'

app.use(mwServ(__dirname + '/../static'))
app.use(mwRequestId)
app.use(async (ctx) => ctx.body = "koa app. + koa-static")

// サーバ起動
const port = process.env.PORT || 3000
app.listen(port)
