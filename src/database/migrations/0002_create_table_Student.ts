import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {

    try {

        await db.schema
            .createTable('students')
            .ifNotExists()
            .addColumn('id', 'uuid', (col) =>

                col.defaultTo(sql`gen_random_uuid()`)
                    .primaryKey()

            )
            .addColumn('name', 'varchar(150)', (col) =>

                col.notNull()

            )
            .addColumn('birthdate', 'date', (col) =>

                col.notNull()

            )
            .addColumn('gender', 'varchar(1)', (col) =>

                col.notNull()
                    .check(sql`gender IN ('M', 'F')`)

            )
            .addColumn('cpf', 'varchar(14)', (col) =>

                col.unique()
                    .notNull()

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
            .addColumn('registered', 'boolean', (col) =>

                col.notNull()

            )
            .addColumn('subject_id', 'integer', (col) =>

                col.references('subjects.id')
                    .onDelete('cascade')
                    .onUpdate('cascade')

            )
            .addColumn('teacher_cpf', 'varchar(14)', (col) =>

                col.references('teachers.cpf')
                    .onDelete('cascade')
                    .onUpdate('cascade')

            )
            .execute()

        console.log('Tabela students criada com êxito!');

    } catch (error: any) {

        console.error('Erro ao criar tabela students : ', error.message);

    }

};

export async function down(db: Kysely<any>): Promise<void> {

    try {

        await db.schema
            .dropTable('students')
            .ifExists()
            .execute();

        console.log('Tabela students deletada com êxito!');


    } catch (error: any) {

        console.error('Erro ao deletar students teachers: ', error.message);
        throw error;

    }


};
