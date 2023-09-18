import 'dotenv/config'
import express, { ErrorRequestHandler } from 'express'
import bodyParser from 'body-parser'
import cors from './config/cors'
import logger from './config/logger'
import router from './routes/router'
import os from 'os'
import formData from 'express-form-data'

const app = express()
app.use(cors)
app.use(logger)
app.use(bodyParser.json())

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
}
app.use(formData.parse(options))
app.use(formData.format())
app.use(formData.union())

app.use(router)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})