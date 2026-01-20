import express from 'express'
import { app_config } from './config/config'

const app = express()
const port = app_config.app.port

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))