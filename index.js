const Koa = require('koa');
const app = new Koa();
const fs = require('fs')

const loggerAsync = require('./middleware/loggerAsync');

// logger

app.use(loggerAsync())

function render(page) {
  return new Promise( (resolve, reject) => {
    let viewUrl = `./view/${page}`;
    fs.readFile(viewUrl, "binary", (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function route(url) {
  let view = '';
  switch(url) {
    case "/":
      view = "index.html"
      break;
    case "/index":
      view = "index.html"
      break;
      case "/todo":
      view = "todo.html"
      break;
      case "/404":
      default:
      view = "404.html"
      break;
  }
  let html = await render(view);
  return html;
}

app.use(async ctx => {
  let url = ctx.request.url;
  let html = await route(url);
  ctx.body = html;
});

app.listen(3000, () => {
  console.log("Your application is starting on 3000, open: ", "http://localhost:3000");
});
