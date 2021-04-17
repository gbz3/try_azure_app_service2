import Koa from 'koa'

// __dirname による環境差異を吸収
const getViewRoot = (dirname: string) => {
  if (dirname.startsWith('/home/site/wwwroot')) return '/home/site/wwwroot/src/views'  // On Azure WebApps
  else return __dirname + '/views'  // On WSL2
}

// Koa2 サーバ初期設定
const app = new Koa()

// ミドルウェア設定
import mwServ from 'koa-static'
import { mwRequestId } from './middlewares/request-id'
import views from 'koa-views'
import bodyParser from 'koa-bodyparser'
import { mwRouterWeb } from './middlewares/router-web'

app.use(mwServ(__dirname + '/../static'))
app.use(mwRequestId)
app.use(views(getViewRoot(__dirname), { autoRender: true, extension: 'pug' }))
app.use(bodyParser())
app.use(mwRouterWeb)

// サーバ起動
const port = process.env.PORT || 3000
app.listen(port)
