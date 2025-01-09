//The vite server is only used for development and testing, hence the different servers.
//
import fs from 'node:fs'
import express from 'express'
import { createServer } from 'vite'
import { setupServer } from './src/server/index.js'
import http from 'node:http'
import { Server } from 'socket.io'
const app = express()
const server = http.Server(app)
const io = new Server(server)
const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom'
})
app.use(vite.middlewares)
app.use('*', async (req, res) => {
  try {
    const html = fs.readFileSync('index.html')
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (err) {
    console.error(err)
    res.status(500).end(err)
  }
})

const port = process.env.PORT || 5173;
setupServer(app, io)


server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});


