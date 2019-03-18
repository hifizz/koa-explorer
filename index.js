const Koa = require('koa');
const app = new Koa();
const loggerAsync = require('./middleware/loggerAsync');
const session = require('koa-session-minimal')
const redisStore = require('koa-redis')

app.use(loggerAsync())

const cookie = {
  maxAge: '', // cookie有效时长
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: '',
}

app.use(session({
  key: "SESSION_ID",
  store: redisStore(),
  cookie: cookie
}))

app.use( async ( ctx ) => {

  // 设置session
  if ( ctx.url === '/set' ) {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if ( ctx.url === '/' ) {

    // 读取session信息
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  }
})

app.listen(3000, () => {
  console.log("Your application is starting on 3000, open: ", "http://localhost:3000");
});
