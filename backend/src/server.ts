import express from 'express'
import { routes } from './routes/index'
import cors from 'cors'


export const app = express()

app.use(express.json())

// Configuração do CORS
app.use(cors()); // Permite todas as origens.

app.use(routes)

app.listen(3330, () => {
  console.log('Server is running on port 3330')
})


