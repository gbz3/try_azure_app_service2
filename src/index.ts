import Koa from 'koa'

// Koa2 サーバ初期設定
const app = new Koa()

// ミドルウェア設定
import mwServ from 'koa-static'
import { mwRequestId } from './middlewares/request-id'
import { mwRouterWeb } from './middlewares/router-web'

app.use(mwServ(__dirname + '/../static'))
app.use(mwRequestId)
app.use(mwRouterWeb)

// サーバ起動
const port = process.env.PORT || 3000
app.listen(port)
