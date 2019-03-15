module.exports = async function responseTime(ctx, next) {
  const started = Date.now();
  await next()
  const ellapsed = (Date.now() - started) + 'ms'
  console.log('Response time is:', ellapsed)
  ctx.set('X-ResponseTime', ellapsed)
}
