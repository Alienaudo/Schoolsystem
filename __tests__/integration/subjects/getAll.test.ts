import { Response } from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { testServer } from "../../testServer.setup";
import db from "../../../src/database/db";
import { Subject } from "../../../src/core/interfaces/Subject";

describe('Testa método getAll da classe SubjectsController', (): void => {

    beforeAll(async (): Promise<void> => {

        await testServer
            .post('/api/materias')
            .send({

                subjectName: 'Matemática',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(201);

        await testServer
            .post('/api/materias')
            .send({

                subjectName: 'Física',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(201);

        await testServer
            .post('/api/materias')
            .send({

                subjectName: 'Química',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(201);

    });

    afterAll(async (): Promise<void> => {

        await db
            .deleteFrom('subjects')
            .where('subjects.subjectName', 'in', ['Matemática', 'Física', 'Química'])
            .executeTakeFirstOrThrow();

    });

    test('Deve retornar todas as meterias cadastradas', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias')
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('access-control-expose-headers', 'x-total-count')
            .expect('x-total-count', '3');

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(3);

        res.body.forEach((subject: Subject): void => {

            expect(subject).toHaveProperty('id');
            expect(subject.id).toBeTypeOf('number');

            expect(subject).toHaveProperty('subjectName');
            expect(subject.subjectName).toBeTypeOf('string');

            expect(subject).toHaveProperty('hours');
            expect(subject.hours).toBeTypeOf('string');

            expect(subject).toHaveProperty('description');
            expect(subject.description).toBeTypeOf('string');

        });

    });

    test('Deve retornar somente a matéria passa em "filter".', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias')
            .query({ filter: 'Matemática' })
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('access-control-expose-headers', 'x-total-count')
            .expect('x-total-count', '1');

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);

        res.body.forEach((subject: Subject): void => {

            expect(subject).toHaveProperty('id');
            expect(subject.id).toBeTypeOf('number');

            expect(subject).toHaveProperty('subjectName');
            expect(subject.subjectName).toBeTypeOf('string');

            expect(subject).toHaveProperty('hours');
            expect(subject.hours).toBeTypeOf('string');

            expect(subject).toHaveProperty('description');
            expect(subject.description).toBeTypeOf('string');

        });

    });


    test('Tenta passar "limit" invalido', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias')
            .query({ limit: 'a' })
            .send()
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('query');
        expect(res.body.errors.query).toHaveProperty('limit');
        expect(res.body.errors.query.limit).toEqual('\"\"limit\"\" deve ser um número');

    });

    test('Tenta passar "limit" com valor muito grande', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias')
            .query({ limit: 11111133333333333 })
            .send()
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('query');
        expect(res.body.errors.query).toHaveProperty('limit');
        expect(res.body.errors.query.limit).toEqual('\"limit\" must be a safe number');

    });

    test('Tenta passar "page" invalido', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias')
            .query({ page: 'a' })
            .send()
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('query');
        expect(res.body.errors.query).toHaveProperty('page');
        expect(res.body.errors.query.page).toEqual('\"\"page\"\" deve ser um número');

    });

    test('Tenta passar "page" com valor muito grande', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias')
            .query({ page: 11111133333333333 })
            .send()
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('query');
        expect(res.body.errors.query).toHaveProperty('page');
        expect(res.body.errors.query.page).toEqual('\"page\" must be a safe number');

    });

    test('Tenta passar "filter" muito grande', async (): Promise<void> => {

        const res: Response = await testServer
            .get('/api/materias')
            .query({ filter: 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest' })
            .send()
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('query');
        expect(res.body.errors.query).toHaveProperty('filter');
        expect(res.body.errors.query.filter).toEqual('\"\"filter\"\" deve ter no máximo 25 caracteres');

    });

});
