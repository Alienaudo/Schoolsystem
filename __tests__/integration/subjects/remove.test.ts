import { describe, test, expect } from "vitest";
import { testServer } from "../../testServer.setup";
import db from "../../../src/database/db";
import { DB } from "../../../src/database/models/kysely-types";
import { AliasedAggregateFunctionBuilder, ExpressionBuilder } from "kysely";
import { Response } from "supertest";

describe('Testa método remove da classe SubjectsController', (): void => {

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

    test('Deve remove a matéria da base de dados', async (): Promise<void> => {

        await testServer
            .delete(`/api/materias`)
            .query({ id: subjectId })
            .send()
            .expect(204);

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', 'Materia')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(0);

    });

    test('Tenta remove a matéria sem id', async (): Promise<void> => {

        const res: Response = await testServer
            .delete(`/api/materias`)
            .query({ id: undefined })
            .send()
            .expect(400)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('default');
        expect(res.body.errors.default).toEqual('O paramêtro "id" precisa ser informado.');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', 'Materia')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(1);

    });

    test('Tenta remove a matéria com id inválido', async (): Promise<void> => {

        const res: Response = await testServer
            .delete(`/api/materias`)
            .query({ id: 'Test' })
            .send()
            .expect(500)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('default');
        expect(res.body.errors.default).toEqual('invalid input syntax for type integer: "NaN"');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', 'Materia')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(1);

    });

    test('Não encontrou o id', async (): Promise<void> => {

        const res: Response = await testServer
            .delete(`/api/materias`)
            .query({ id: 99999 })
            .send()
            .expect(500)
            .expect('Content-Type', /json/);

        expect(res.body).toBeTypeOf('object');
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveProperty('default');
        expect(res.body.errors.default).toEqual('Nenhuma matéria encontrada com id: 99999');

        const resDB: {

            count: number;

        } = await db
            .selectFrom('subjects')
            .where('subjects.subjectName', '=', 'Materia')
            .select(({ fn }: ExpressionBuilder<DB, "subjects">): AliasedAggregateFunctionBuilder<DB, "subjects", number, "count">[] => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        expect(Number(resDB.count)).toEqual(1);

    });

});
