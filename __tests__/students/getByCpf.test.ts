import { beforeAll, describe, expect, test } from "vitest";
import { Studant } from "../../src/core/interfaces/Studant";
import { testServer } from "../testServer.setup";

describe('Testa o método getByCpf da classe StudentsController.', () => {

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

    test('Busca o/a estudante pelo cpf.', async () => {

        const res = await testServer
            .get('/api/estudantes/cpf/509.590.981-27');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('object');

    });

    test('Tenta passar um cpf invalido.', async () => {

        const res = await testServer
            .get('/api/estudantes/cpf/509-590-981-27');

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.params.cpf');

    });

});

