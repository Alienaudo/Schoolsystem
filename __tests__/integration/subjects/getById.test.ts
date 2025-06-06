import { describe, test, expect } from "vitest";
import { testServer } from "../../testServer.setup";
import db from "../../../src/database/db";
import { Response } from "supertest";

describe('Testa método getById da classe SubjectsController', (): void => {

    let subjectId: number;

    beforeEach(async (): Promise<void> => {

        await testServer
            .post('/api/materias')
            .send({

                subjectName: 'Materia',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(201);

        const id: {

            id: number;

        } = await db
            .selectFrom('subjects')
            .select('id')
            .where('subjects.subjectName', '=', 'Materia')
            .executeTakeFirstOrThrow();

        subjectId = id.id;

    });

    afterEach(async (): Promise<void> => {

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', subjectId)
            .executeTakeFirstOrThrow();

    });

    test('Tenta buscar a metéria sem passar o id', async (): Promise<void> => {

        await testServer
            .get('/api/materias/id/')
            .expect(404)
            .expect('Content-Type', /html/);

    });

    test('Tenta passar um id inválido', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias/id/Test')
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('params');
        expect(res.body.errors.params).toHaveProperty('id');
        expect(res.body.errors.params.id).toEqual('\"\"id\"\" deve ser um número');

    });

    test('Não encontrou o id', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias/id/99999999')
            .expect(500)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('default');
        expect(res.body.errors.default).toEqual('Error: no result');

    });

    test('Deve retorna a matéria', async (): Promise<void> => {

        const res: Response = await testServer
            .get(`/api/materias/id/${subjectId}`)
            .send()
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');

        expect(res.body).toHaveProperty('subjectName');
        expect(res.body.subjectName).toBeTypeOf('string');

        expect(res.body).toHaveProperty('hours');
        expect(res.body.hours).toBeTypeOf('string');

        expect(res.body).toHaveProperty('description');
        expect(res.body.description).toBeTypeOf('string');

    });

});
