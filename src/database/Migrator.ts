import { Migrator, FileMigrationProvider } from 'kysely';
import * as path from 'path';
import { promises as fs } from 'fs';
import db from './db.js';

const __dirname = import.meta.dirname;

const migrator = new Migrator({

    db,
    provider: new FileMigrationProvider({

        fs,
        path,
        migrationFolder: path.join(__dirname, './migrations/'), // Caminho relativo até a pasta migrations

    }),

});

async function runMigrations(): Promise<void> {

    const { error, results } = await migrator.migrateToLatest();

    if (results) {

        results.forEach((result) => {

            if (result.status === 'Success') {

                console.log(`Migração "${result.migrationName}" executada com sucesso`);

            } else if (result.status === 'Error') {

                console.error(`Erro ao executar a migração "${result.migrationName}"`);

            }

        });

    }

    if (error) {

        console.error('Erro ao rodar migrateToLatest:', error);
        process.exit(1);

    }

    await db.destroy(); // Fecha a conexão com o banco

}

async function migrateDown(): Promise<void> {

    const { error, results } = await migrator.migrateDown();

    if (results) {

        results.forEach((result) => {

            if (result.status === 'Success') {

                console.log(`Migração "${result.migrationName}" revertida com sucesso`);

            } else if (result.status === 'Error') {

                console.error(`Erro ao reverter a migração "${result.migrationName}"`);

            }

        });

    }

    if (error) {

        console.error('Erro ao rodar migrateDown:', error);
        process.exit(1);

    }

    await db.destroy(); // Fecha a conexão com o banco

};

async function listMigrations(): Promise<void> {

    const migrations = await migrator.getMigrations();

    migrations.forEach((migration) => {

        console.log(`Migração: ${migration.name}, Aplicada: ${migration.executedAt}`);

    });

    await db.destroy();

};

const option = process.argv[2]

switch (option) {
    case 'latest':
        runMigrations();
        break;

    case 'down':
        migrateDown();
        break;

    case 'list':
        listMigrations();
        break;

    default:
        console.error('Operação não encontrada. Por favor use: latest, down ou list');

}
