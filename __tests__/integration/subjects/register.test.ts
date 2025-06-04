import { describe, expect, test } from "vitest";
import { testServer } from "../../testServer.setup";
import db from "../../../src/database/db";
import { Response } from "supertest";
import { DB } from "../../../src/database/models/kysely-types";
import { AliasedAggregateFunctionBuilder, ExpressionBuilder } from "kysely";

describe('Testa o método register da classe SubjectsController.', (): void => {

    test('Deve cadastrar meteria, receber status "201" e um json com o "id".', async (): Promise<void> => {

        const res: Response = await testServer
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

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '01_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(1);

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', res.body.id)
            .executeTakeFirstOrThrow();

    });

    test('Tenta cadastrar materia sem um nome', async (): Promise<void> => {

        const res: Response = await testServer
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
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('subjectName');
        expect(res.body.errors.body.subjectName).toEqual('\"\"subjectName\"\" não pode estar vazio');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', res.body.id)
            .executeTakeFirstOrThrow();

    });

    test('Tenta cadastrar com nome muito grande', async (): Promise<void> => {

        const res: Response = await testServer
            .post('/api/materias')
            .send({

                subjectName: '03_Testttttttttttttttttttttttttttttttttttttttttttttttttttttt',
                hours: 40.7,
                description: 'Testtesteetste'

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('subjectName');
        expect(res.body.errors.body.subjectName).toEqual('\"\"subjectName\"\" deve ter no máximo 50 caracteres');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '03_Testttttttttttttttttttttttttttttttttttttttt')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', res.body.id)
            .executeTakeFirstOrThrow();

    });

    test('Tenta cadastrar com nome com formato inválido.', async (): Promise<void> => {

        const res: Response = await testServer
            .post('/api/materias')
            .send({

                subjectName: 999,
                hours: 40.7,
                description: 'Testtesteetste'

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('subjectName');
        expect(res.body.errors.body.subjectName).toEqual('\"\"subjectName\"\" deve ser uma string');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '999')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', res.body.id)
            .executeTakeFirstOrThrow();

    });


    test('Tenta cadastrar com as horas no formato inválido', async (): Promise<void> => {

        const res: Response = await testServer
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
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('hours');
        expect(res.body.errors.body.hours).toEqual('\"\"hours\"\" deve ser um número');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '02_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', res.body.id)
            .executeTakeFirstOrThrow();

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
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('description');
        expect(res.body.errors.body.description).toEqual('\"\"description\"\" não pode estar vazio');

        const resDB = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '03_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', res.body.id)
            .executeTakeFirstOrThrow();

    });

    test('Tenta cadastrar com a descrição no formato inválido', async (): Promise<void> => {

        const res = await testServer
            .post('/api/materias')
            .send({

                subjectName: '04_Test',
                hours: 36.7,
                description: 999

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('description');
        expect(res.body.errors.body.description).toEqual('\"\"description\"\" deve ser uma string');

        const resDB = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '04_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', res.body.id)
            .executeTakeFirstOrThrow();

    });

    test('Tenta cadastrar com a descrição muito grande', async (): Promise<void> => {

        const res = await testServer
            .post('/api/materias')
            .send({

                subjectName: '05_Test',
                hours: 36.7,
                description: "Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,Test,..."

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('description');
        expect(res.body.errors.body.description).toEqual('\"\"description\"\" deve ter no máximo 300 caracteres');

        const resDB = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '05_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

        await db
            .deleteFrom('subjects')
            .where('subjects.id', '=', res.body.id)
            .executeTakeFirstOrThrow();

    });

});
