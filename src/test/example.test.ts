import request from 'supertest'
import {expect, test} from 'vitest'
import { app } from '../server'

test('testando rota', async () => {
    const response = await request(app).get('/')

    expect(response.statusCode).toBe(200)
})