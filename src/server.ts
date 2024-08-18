import express from 'express'


export const app = express()

app.listen(3330, () => {
  console.log('Server is running')
})

app.use(express.json())

app.use()
