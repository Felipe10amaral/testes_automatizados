import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { clientesRoutes } from './clienteRoutes'
import { notasRoutes } from './notasRoutes'

export const routes = Router()

routes.use('/users', usersRoutes())
routes.use('/clientes', clientesRoutes())
routes.use('/notas', notasRoutes())