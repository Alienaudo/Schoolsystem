import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { testServer } from "../../testServer.setup";
import db from "../../../src/database/db";
import { Subject } from "../../../src/core/interfaces/Subject";
import { Response } from "supertest";
import { AliasedAggregateFunctionBuilder, ExpressionBuilder } from "kysely";
import { DB } from "../../../src/database/models/kysely-types";

describe('Test método update da classe SubjectController.', (): void => {

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

    test('Tenta atualizar a metéria sem passar o id query', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=`)
            .send({

                subjectName: '01_Test',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('default');
        expect(res.body.errors.default).toEqual('Parametro "id" obrigatório.');

    });

    test('Não encontrou o id', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=9999`)
            .send({

                subjectName: '01_Test',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(500)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('default');
        expect(res.body.errors.default).toEqual('Error: no result');

    });

    test('Deve atualizar a metéria, receber status "204".', async (): Promise<void> => {

        await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '01_Test',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(204);

        const updatedSubject: Subject = await db
            .selectFrom('subjects')
            .selectAll()
            .where('subjects.id', '=', subjectId)
            .executeTakeFirstOrThrow();

        expect(updatedSubject.subjectName).toBe('01_Test');
        expect(updatedSubject.hours).toBe('40.5');
        expect(updatedSubject.description).toBe('Testtesteetste');

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

    });

    test('Tenta atualizar matéria sem um nome', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '',
                hours: 40.5,
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

    });

    test('Tenta atualizar matéria passando nome muito curto', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '01',
                hours: 40.5,
                description: 'Testtesteetste'

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('subjectName');
        expect(res.body.errors.body.subjectName).toEqual('\"\"subjectName\"\" deve ter pelo menos 3 caracteres');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '01')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta atualizar matéria passando nome muito longo', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '02_Testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt...',
                hours: 40.5,
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
            .where('subjects.subjectName', '=', '02_Testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt...')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta atualizar matéria passando nome no formato inválido', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: 999,
                hours: 40.5,
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

    });

    test('Tenta atualizar matéria passando horas com valor inválido', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '03_Test',
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
            .where('subjects.subjectName', '=', '03_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta atualizar matéria passando horas no formato inválido', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '04_Test',
                hours: '34.5b',
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
            .where('subjects.subjectName', '=', '03_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta atualizar matéria sem uma descrição', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '05_Test',
                hours: 40.5,
                description: ''

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('description');
        expect(res.body.errors.body.description).toEqual('\"\"description\"\" não pode estar vazio');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '05_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta atualizar matéria passando descrição muito curta', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '06_Test',
                hours: 40.5,
                description: 'test'

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('description');
        expect(res.body.errors.body.description).toEqual('\"\"description\"\" deve ter pelo menos 10 caracteres');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '06_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta atualizar matéria passando descrição muito longa', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '07_Test',
                hours: 40.5,
                description: 'TesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescriptonTesteDescripton'

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('description');
        expect(res.body.errors.body.description).toEqual('\"\"description\"\" deve ter no máximo 300 caracteres');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '07_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta atualizar matéria passando descrição no formato inválido', async (): Promise<void> => {

        const res: Response = await testServer
            .put(`/api/materias?id=${subjectId}`)
            .send({

                subjectName: '07_Test',
                hours: 40.5,
                description: true

            })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('body');
        expect(res.body.errors.body).toHaveProperty('description');
        expect(res.body.errors.body.description).toEqual('\"\"description\"\" deve ser uma string');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', '07_Test')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

});
