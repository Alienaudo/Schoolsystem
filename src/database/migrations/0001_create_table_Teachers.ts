import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {

    try {

        await db.schema
            .createTable('teachers')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) =>

                col.defaultTo(sql`gen_random_uuid()`)

            )
            .addColumn('name', 'varchar(150)', (col) =>

                col.notNull()

            )
            .addColumn('birthdate', 'date', (col) =>

                col.notNull()

            )
            .addColumn('gender', 'char', (col) =>

                col.notNull()

            )
            .addColumn('cpf', 'varchar(14)', (col) =>

                col.unique()
                    .notNull()
                    .primaryKey()

            )
            .addColumn('phone', 'varchar(15)', (col) =>

                col.notNull()

            )
            .addColumn('email', 'varchar(254)', (col) =>

                col.unique()
                    .notNull()

            )
            .addColumn('subject', 'varchar(50)', (col) =>

                col.notNull()

            )
            .addColumn('subject_id', 'integer', (col) =>

                col.references('subjects.id')
                    .onDelete('cascade')
                    .onUpdate('cascade')

            )
            .execute()

        console.log('Tabela teachers criada com êxito!');

    } catch (error: any) {

        console.error('Erro ao criar tabela teachers : ', error.message);
        throw error;

    }

};

export async function down(db: Kysely<any>): Promise<void> {

    try {

        await db.schema
            .dropTable('teachers')
            .ifExists()
            .execute();

        console.log('Tabela teachers deletada com êxito!');


    } catch (error: any) {

        console.error('Erro ao deletar tabela teachers: ', error.message);
        throw error;

    }


};
