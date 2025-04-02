import { beforeAll, describe, expect, test } from "vitest";
import { Studant } from "../../src/core/interfaces/Studant";
import { testServer } from "../testServer.setup";

describe('Testa método getBySubjectId da classe StudentController.', () => {

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

    test('Busca o/a estudante pelo id da matéria.', async () => {

        const res = await testServer
            .get('/api/estudantes/materiaId/1');

        expect(res.statusCode).toEqual(200);

    });

    test('Tenta passa um id inválido, como parametro.', async () => {

        const res = await testServer
            .get('/api/estudantes/materiaId/-1');

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.params.id');

    });

});
