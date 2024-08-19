import express from 'express'
import { routes } from './routes/index'


export const app = express()

app.use(express.json())

app.use(routes)

app.listen(3330, () => {
  console.log('Server is running on port 3330')
})


