import { beforeAll, describe, test } from "vitest";
import { testServer } from "../testServer.setup";
import { Studant } from "../../src/core/interfaces/Studant";

describe('Testa metodo "getAll" da classe StudentController.', () => {

    beforeAll(() => {

        const body: Studant = {

            name: 'Alfredo de Souza Ramos',
            birthdate: new Date('2025-01-02 13:30:35.556'),
            gender: 'M',
            cpf: '509.590.981-27',
            phone: '(95) 97963-5528',
            email: 'exemplodeemail@exemplo.com.br',
            subject: 'Matemática',
            registered: true,
            subjectId: 1

        };

        testServer
            .post('/api/estudantes')
            .send(body);

    });

    test('Deve retornar os estudantes matriculados.', async () => {

        const res = await testServer
            .get('/api/estudantes');

        expect(res.statusCode).toEqual(200);
        expect(Number(res.header['x-total-count'])).toBeGreaterThan(0);

    });

    test('Tenta passar um numero de páginas inválido, como parametro.', async () => {

        const res = await testServer
            .get('/api/estudantes?page=Test');

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.query.page');

    });

    test('Tenta passar um limite inválido, como parametro.', async () => {

        const res = await testServer
            .get('/api/estudantes?limit=Test');

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.query.limit');

    });

});
