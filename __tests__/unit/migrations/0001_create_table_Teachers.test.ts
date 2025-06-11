import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { up, down } from "../../../src/database/migrations/0001_create_table_Teachers.ts";
import { up as upStudent, down as downStudent } from "../../../src/database/migrations/0000_create_table_Subjects.ts";
import { DB } from "../../../src/database/models/kysely-types.d.js";
import { Pool } from "pg";
import { CamelCasePlugin, Kysely, PostgresDialect, TableMetadata } from "kysely";

describe('Testa migração 0001 que cria a tabela teachers', (): void => {

    const db: Kysely<DB> = new Kysely<DB>({

        dialect: new PostgresDialect({

            pool: new Pool({

                host: "localhost",
                port: 5433,
                user: "postgres",
                password: "123",
                database: "testDB"

            }),

        }),

        plugins: [new CamelCasePlugin()],

    });

    beforeAll(async (): Promise<void> => {

        await upStudent(db);

    });

    afterAll(async (): Promise<void> => {

        await downStudent(db);
        await db.destroy();

    });

    test('Deve criar a tabela teachers', async (): Promise<void> => {

        await up(db);

        const tabela: TableMetadata[] = await db
            .introspection
            .getTables();

        const tabelaExists: boolean = tabela.some((tabela: TableMetadata): boolean => tabela.name === 'teachers');

        expect(tabelaExists).toBe(true);

    });

    test('Deve apagar a tabela teachers', async (): Promise<void> => {

        await down(db);

        const tabela: TableMetadata[] = await db
            .introspection
            .getTables();

        const tabelaExists: boolean = tabela.some((tabela: TableMetadata): boolean => tabela.name === 'teachers');

        expect(tabelaExists).toBe(false);

    });

});
