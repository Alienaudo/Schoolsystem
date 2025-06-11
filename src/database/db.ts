import { Kysely, PostgresDialect, CamelCasePlugin } from "kysely";
import { Pool, PoolConfig } from "pg";
import "dotenv/config";
import { DB } from "./models/kysely-types.js";

const database: string = process.env.DB || 'MyDataBase';
const host: string = process.env.DB_HOST || 'localhost';
const port: number = parseInt(process.env.DB_PORT || '3306', 10);
const user: string = process.env.DB_USER || 'root';
const password: string = process.env.DB_ROOT_PASSWORD || '123';

const kyselyConfig: Record<string, PoolConfig> = {

    development: {

        host: "localhost",
        port: 5432,
        user: user,
        password: password,
        database: "ScholarDB_Dev",

    },

    test: {

        host: "localhost",
        port: 5433,
        user: "postgres",
        password: "123",
        database: "testDB"

    },

    production: {

        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
        max: 10

    },

};

const env: string = process.env.NODE_ENV || "development";

if (!['development', 'test', 'production'].includes(env)) {

    throw new Error(`Ambiente inválido: ${env}. Use "development", "test" ou "production".`);

}

const poolConfig: PoolConfig | undefined = kyselyConfig[env];
const pool: Pool = new Pool(poolConfig);

const db: Kysely<DB> = new Kysely<DB>({

    dialect: new PostgresDialect({

        pool,

    }),

    plugins: [new CamelCasePlugin()],

});

export default db;
