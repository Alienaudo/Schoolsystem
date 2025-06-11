import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { up, down } from "../../../src/database/migrations/0002_create_table_Student.ts";
import { up as upSubjects, down as downSubjects } from "../../../src/database/migrations/0000_create_table_Subjects.ts";
import { up as upTeachers, down as downTeachers } from "../../../src/database/migrations/0001_create_table_Teachers.ts";
import { DB } from "../../../src/database/models/kysely-types.d.js";
import { Pool } from "pg";
import { CamelCasePlugin, Kysely, PostgresDialect, TableMetadata } from "kysely";

describe('Testa migração 0002 que cria a tabela students', (): void => {

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

        await upSubjects(db);
        await upTeachers(db);

    });

    afterAll(async (): Promise<void> => {

        await downTeachers(db);
        await downSubjects(db);
        await db.destroy();

    });

    test('Deve criar a tabela students', async (): Promise<void> => {

        await up(db);

        const tabela: TableMetadata[] = await db
            .introspection
            .getTables();

        const tabelaExists: boolean = tabela.some((tabela: TableMetadata): boolean => tabela.name === 'students');

        expect(tabelaExists).toBe(true);

    });

    test('Deve apagar a tabela students', async (): Promise<void> => {

        await down(db);

        const tabela: TableMetadata[] = await db
            .introspection
            .getTables();

        const tabelaExists: boolean = tabela.some((tabela: TableMetadata): boolean => tabela.name === 'students');

        expect(tabelaExists).toBe(false);

    });

});
