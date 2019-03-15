const Koa = require('koa');
const app = new Koa();

const loggerAsync = require('./middleware/loggerAsync');

app.use(loggerAsync())

app.use( async ( ctx ) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = JSON.stringify({
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  })
})


app.listen(3000, () => {
  console.log("Your application is starting on 3000, open: ", "http://localhost:3000");
});
