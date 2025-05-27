import { describe, expect, test } from "vitest";
import { testServer } from "../../testServer.setup";
import db from "../../../src/database/db";

describe('Testa o método register da classe SubjectsController.', (): void => {

    test('Deve cadastrar meteria e retornar status "201" e um json com o "id".', async (): Promise<void> => {

        const res = await testServer
            .post('/api/materias')
            .send({

                subjectName: '01_Test',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(201)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('id');

        const resDB = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '01_Test')
            .select(({ fn }) => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(1);

        db
            .deleteFrom('subjects')
            .executeTakeFirstOrThrow();

    });

    test('Tenta cadastrar materia sem um nome', async (): Promise<void> => {

        const res = await testServer
            .post('/api/materias')
            .send({

                subjectName: '',
                hours: 36.7,
                description: 'Testtesteetste'

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body).toHaveProperty('errors.body');
        expect(res.body).toHaveProperty('errors.body.subjectName');

        const resDB = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '')
            .select(({ fn }) => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta cadastrar com as horas no formato inválido', async (): Promise<void> => {

        const res = await testServer
            .post('/api/materias')
            .send({

                subjectName: '02_Test',
                hours: 'NaN',
                description: 'Testtesteetste'

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body).toHaveProperty('errors.body');
        expect(res.body).toHaveProperty('errors.body.hours');

        const resDB = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '')
            .select(({ fn }) => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta cadastrar sem uma descrição', async (): Promise<void> => {

        const res = await testServer
            .post('/api/materias')
            .send({

                subjectName: '03_Test',
                hours: 36.7,
                description: ''

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body).toHaveProperty('errors.body');
        expect(res.body).toHaveProperty('errors.body.description');

        const resDB = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '')
            .select(({ fn }) => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

});
