import express from 'express'
import cors from 'cors'
import bootstrap from './src/bootstrap.js'
const app = express()
app.use(cors())
const port = process.env.PORT||3000
bootstrap(app,express)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

