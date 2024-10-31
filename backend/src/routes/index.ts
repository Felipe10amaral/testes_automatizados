import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { clientesRoutes } from './clienteRoutes'

export const routes = Router()

routes.use('/users', usersRoutes())
routes.use('/clientes', clientesRoutes())