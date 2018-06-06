const QRCode = require('qrcode')
const Koa = require('koa');
const app = new Koa();

function getImage(text){
  return new Promise((res, rej) => {
    QRCode.toString(text, {type: 'svg'}, function (err, obj) {
      if(err) rej(err);
      else res(obj);
    })
  });
}

app.use(async ctx => {
  const imageObj = await getImage(ctx.query.address);
  console.log(imageObj);
  ctx.body = imageObj;
  ctx.type = 'image/svg'
});

app.listen(3000);
