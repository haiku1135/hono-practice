import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';
import { helloRouter } from './api/hello';
import { upgradeWebSocket } from 'hono/cloudflare-workers';

const app = new Hono()

// Basic認証のミドルウェアを追加
app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret'
  })
)

// 保護されたルート
app.get('/admin', (c) => {
  return c.text('認証に成功しました！')
})

app.get('/', (c) => {
  return c.text('Honoを使ってみたよ!')
})

app.get('/posts/:id', (c) => {
  const page = c.req.query('page');
  const id = c.req.param('id');
  c.header('X-Message', 'Hi Hono!');
  return c.text(`You want see ${page} of ${id}`);
})

app.post('/posts', (c) => c.text('Created!!!', 201))
app.delete('/posts/:id', (c) => c.text(`${c.req.param('id')} is deleted`))



// APIルートをマウント
app.route('/api', helloRouter)

export default app