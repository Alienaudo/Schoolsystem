import knex, { Knex } from "knex";
import connection from "../connection.js";

export async function up(knex: Knex): Promise<void> {

    const existsTeachers: boolean = await knex.schema.hasTable('teachers');

    if (existsTeachers) {

        console.error('Tabela teachers já existe.');
        return knex.destroy();

    }

    await knex.schema.createTable('teachers', (table) => {

        table
            .engine('InnoDB');

        table
            .charset('utf8');

        table
            .string('id', 36)
            .primary()
            .defaultTo(knex.raw('UUID()'));
    
        table
            .string('name', 150)
            .notNullable();
    
        table
            .date('birthdate')
            .notNullable();

        table
            .enum('gender', ['M', 'F'])
            .notNullable();
    
        table
            .string('cpf', 16)
            .unique()
            .notNullable();
    
        table
            .string('phone', 15)
            .nullable();
    
        table
            .string('email', 100)
            .unique()
            .notNullable();
    
        table
            .string('subject', 50)
            .notNullable();

        table
            .integer('subject_id')
            .notNullable()
            .unsigned();

        table
            .foreign('subject_id')
            .references('id')
            .inTable('subjects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    })
    .then(() => {

        console.log('Tabela teachers criada com êxito!');

    })
    .catch(error => { 

        console.error('Erro ao criar tabela teachers : ', error.message);
        
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

        console.log('Tabela teachers excluida com êxito!');
        
    })
    .catch(error => { 

        console.error('Erro ao deletar tabela teachers : ', error.message);

    })
    .finally(() => {
        
        knex.destroy();

    });

};

await up(knex(connection));
