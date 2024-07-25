import express, {Request, Response} from 'express'

const app = express()

app.listen(3330, () => {
  console.log("Server is running")
})

app.get('/', (req:Request, res:Response) => {
    
    return res.status(200).send({message: 'hello world'})

})