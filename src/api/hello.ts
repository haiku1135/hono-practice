import { Hono } from 'hono'

const app = new Hono()

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!'
  })
})

export { app as helloRouter }