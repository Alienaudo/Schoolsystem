import { describe, expect, test } from "vitest";
import { testServer } from "../testServer.setup";
import { Studant } from "../../src/core/interfaces/Studant";

describe('Testa o método register da classe StudentsController.', () => {

    let body: Studant = {

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

    test('Deve matricular o estudante e retornar o status 201.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send(body);

        expect(res.statusCode).toEqual(201);
        expect(typeof res.body).toEqual('string');

    });

    test('Tenta matricular um estudante com nome muito curto.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({ name: 'Ar' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.name');

    });

    test('Tenta matricular um estudante sem a data de nascimento.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({

                name: 'Ari',
                gender: 'M',
                cpf: '509.590.981-27',
                phone: '(95) 97963-5528',
                email: 'exemplodeemail@exemplo.com.br',
                subject: 'Matemática',
                registered: true,
                subjectId: 1

            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.birthdate');

    });

    test('Tenta matricular um estudante com "gender" inválido.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({ gender: 'Test' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.gender');

    });

    test('Tenta matricular um estudante com cpf inválido.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({ cpf: '509.590/981-27' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.cpf');

    });

    test('Tenta matricular um estudante com numero de telefone inválido.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({ phone: '(95) 97963.5528' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.phone');

    });

    test('Tenta matricular um estudante com email inválido.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({ email: 'exemplodeemailexemplo.com.br' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.email');

    });

    test('Nome da matéria muito curto.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({ subject: 'T' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.subject');

    });

    test('Tenta matricular um estudante com atributo registered invalido.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({ registered: 'T' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.registered');

    });

    test('Tenta matricular um estudante com id da matéria inválido.', async () => {

        const res = await testServer
            .post('/api/estudantes')
            .send({ subjectId: 'Test' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors.body.subjectId');

    });

});
