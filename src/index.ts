import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from './config/cors'
import logger from './config/logger'
import router from './routes/router'
import authenticateImplicitWithAdc from './cloud/cloud'

// authenticateImplicitWithAdc()

const app = express()
app.use(cors)
app.use(logger)
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }))

app.use(router)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})