import { Request, Response } from 'express'
import z from 'zod'
import userServices from '../useCases/registerUser'

export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(req.body)

  userServices.create({ name, email, password })

  return res.status(201).send()
}
