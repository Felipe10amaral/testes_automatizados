import { Router } from 'express'
import { register } from '../controller/register'

export const usersRoutes = Router()

usersRoutes.post('/', register)
