import { describe, test } from "vitest";
import { Studant } from "../../src/core/interfaces/Studant";
import { testServer } from "../testServer.setup";

describe('Testa o método remove da classe StudentController.', () => {

    test('Apaga estudante.', async () => {

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

        const res = await testServer
            .delete('/api/estudantes/cpf/509.590.981-27');

        expect(res.statusCode).toEqual(204);

    });

    test('Tenta apagar um estudante que não existe.', async () => {

        const res = await testServer
            .delete('/api/estudantes/cpf/000.000.981-27');

        expect(res.statusCode).toEqual(500);

    });

});
