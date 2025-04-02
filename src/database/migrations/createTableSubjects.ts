import knex, { Knex } from "knex";
import connection from "../connection.js";

export async function up(knex: Knex): Promise<void> {

    const existsSubjects: boolean = await knex.schema.hasTable('subjects');

    if (existsSubjects) {

        console.error('Tabela subjects já existe.');
        return knex.destroy();

    }
    
    await knex.schema.createTable('subjects', (table) => {
        
        table
            .engine('InnoDB');

        table
            .charset('utf8');

        table
            .increments('id').primary();
    
        table
            .string('subject_name', 100).notNullable();
    
        table
            .float('hours')
            .notNullable();

        table
            .string('description', 300)
            .nullable();

    })
    .then(() => {

        console.log('Tabela subjects criada com êxito!');

    })
    .catch(error => {

        console.error('Erro ao criar tabela subjects : ', error.message);
        
    })
    .finally(() => {

        knex.destroy();

    });


};

export async function down(knex: Knex): Promise<void> {

    const existsStudants: boolean = await knex.schema.hasTable('teachers');

    if (!existsStudants) {

        console.error('Tabela teachers não existe.');
        return knex.destroy();

    }

    await knex.schema.dropTable('teachers')
    .then(() => {

        console.log('Tabela excluida com êxito!');
        
    })
    .catch(error => {

        console.error('Erro ao deletar tabela : ', error.message);

    })
    .finally(() => {
        
        knex.destroy();

    });

};

await up(knex(connection));
