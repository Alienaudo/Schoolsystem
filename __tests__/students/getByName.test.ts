import { describe, test, expect, beforeAll } from "vitest";
import { testServer } from "../testServer.setup";
import { Studant } from "../../src/core/interfaces/Studant";

describe('Testa método getByName da classe StudentController.', () => {

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

    test('Busca o/a estudante pelo nome.', async () => {

        const res = await testServer
            .get('/api/estudantes/nome/Alfredo%20de%20Souza%20Ramos');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('object');

    });

    test('Tenta passar um nome não cadastrado.', async () => {

        const res = await testServer
            .get('/api/estudantes/nome/Frederico');

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.params.name');
    });

});
