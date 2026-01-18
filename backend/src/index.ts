import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'

import activity from './routes/activity.ts'
import user from './routes/user.ts'

const app = express()
const port = process.env.PORT ?? '5000'

app.use(cors({ origin: true, credentials: true }))
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())

app.use(user).use(activity)

app.listen(port, () => {
  console.log(`Server available on http://localhost:${port}/.`)
})

export default app
