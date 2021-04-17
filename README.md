# try_azure_app_service2

## nodenv で node リスト最新化

```bash
$ git -C "$(nodenv root)"/plugins/node-build pull
...
 create mode 100644 share/node-build/10.24.1
 create mode 100644 share/node-build/12.22.1
 create mode 100644 share/node-build/14.16.1
 create mode 100644 share/node-build/15.14.0
$ nodenv install --list |grep ^14.16
14.16.0
$ nodenv versions
* 12.16.1 (set by /home/***/.anyenv/envs/nodenv/version)
  14.15.4
  14.15.5
  14.16.0
$ nodenv install 14.16.1
$
```

## node ローカルインストール

```bash
$ nodenv local 14.16.1
$ node -v
v14.16.1
$ npm -v
6.14.12
```

## koa2/typescript 環境構築

- [Koa.js ミドルウェアの作り方](https://qiita.com/kei-nakoshi/items/904c46faff621c1be674)
- [TypeScript Ninja](http://typescript.ninja/typescript-in-definitelyland/index.html)
- [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/)
- [Node.js & TypeScriptのプロジェクト作成](https://typescript-jp.gitbook.io/deep-dive/nodejs)

```bash
$ npm init -y
$ npm i -D typescript @types/node ts-node
$ npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es2019,dom --module commonjs
$ cp -p package.json package.json.org
$ vi package.json
$ diff package.json package.json.org
7,10c7
<     "3000": "PORT=3000 ts-node src/index.ts",
<     "build": "tsc",
<     "start": "node lib/index.js",
<     "test": "echo \"no test specified\" && exit 0"
---
>     "test": "echo \"Error: no test specified\" && exit 1"
$ npm i -S koa
$ npm i -D @types/koa
$ cat src/index.ts 
import Koa from 'koa'

// Koa2 サーバ初期設定
const app = new Koa()

// ミドルウェア設定
app.use(async (ctx) => ctx.body = "koa app.")

// サーバ起動
const port = process.env.PORT || 3000
app.listen(port)
$ npm run 3000    # Ctrl-C で停止。http://localhost:3000 でアクセス
```

## webpack 導入（フロントエンド用）

- [最新版で学ぶwebpack 5入門 JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)
- [webpack の基本的な使い方](https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html)

```bash
$ npm i -D webpack webpack-cli
$ echo "static/main.js" >> .gitignore
```

## フロントエンドを Typescript 化

- [最新版TypeScript+webpack 5の環境構築まとめ](https://ics.media/entry/16329/)

```bash
$ npm i -D ts-loader
```
