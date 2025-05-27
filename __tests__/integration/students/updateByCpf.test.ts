import { describe, test, beforeAll } from "vitest";
import { testServer } from "../../testServer.setup";
import { Studant } from "../../../src/core/interfaces/Studant";

describe('Testa método updateByCpf da classse StudentsController.', () => {

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

    test('Atualiza as informações do estudante.', async () => {

        const res = await testServer
            .put('/api/estudantes/cpf/509.590.981-27')
            .send({

                name: 'Alfredo de Souza Ramos',
                birthdate: new Date('2025-01-02 13:30:35.556'),
                gender: 'M',
                cpf: '509.590.981-27',
                phone: '(95) 97963-5528',
                email: 'exemplodeemail@exemplo.com.br',
                subject: 'Matemática',
                registered: false, // Não está mais matriculado.
                subjectId: 1

            });

        expect(res.statusCode).toEqual(200)

    });

    test('Tenta passar um cpf inválido, como parametro.', async () => {

        const res = await testServer
            .put('/api/estudantes/cpf/509(590.981-27')
            .send({

                name: 'Alfredo de Souza Ramos',
                birthdate: new Date('2025-01-02 13:30:35.556'),
                gender: 'M',
                cpf: '509.590.981-27',
                phone: '(95) 97963-5528',
                email: 'exemplodeemail@exemplo.com.br',
                subject: 'Matemática',
                registered: false, // Não está mais matriculado.
                subjectId: 1

            });

        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('errors.params.cpf')

    });

});
