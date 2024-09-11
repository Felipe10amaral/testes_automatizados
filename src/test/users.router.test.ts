import request from 'supertest'
import {expect, test, vi, describe, it} from 'vitest'
import {app} from '../server'

describe('testando rota de listagem de usuarios ativos', () => {
    it('deve ser possivel retornar uma lista de usuarios', async () => {
        const response = await request(app).get('/users');
        
        expect(response.statusCode).toBe(200);
        
    });
});