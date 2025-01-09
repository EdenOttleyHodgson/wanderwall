import fs from 'node:fs'
import express from 'express'
import { setupServer } from './src/server/index.js'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io'
const app = express()
const server = http.Server(app)
const io = new Server(server)

app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/'), { index: false }));

app.use('*', async (req, res) => {
  try {
    const html = fs.readFileSync('./dist/index.html')
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


