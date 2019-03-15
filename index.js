const Koa = require('koa');
const app = new Koa();
const loggerAsync = require('./middleware/loggerAsync');

app.use(loggerAsync())

app.use( async (ctx, next) => {
  if(ctx.url === '/index') {
    ctx.cookies.set(
      "cid",
      "hello world",
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/index',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world'
  }
})


app.listen(3000, () => {
  console.log("Your application is starting on 3000, open: ", "http://localhost:3000");
});
