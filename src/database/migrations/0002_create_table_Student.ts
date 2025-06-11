import { ColumnDefinitionBuilder, Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {

    try {

        await db.schema
            .createTable('students')
            .ifNotExists()
            .addColumn('id', 'uuid', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.defaultTo(sql`gen_random_uuid()`)
                    .primaryKey()

            )
            .addColumn('name', 'varchar(150)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()

            )
            .addColumn('birthdate', 'date', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()

            )
            .addColumn('gender', 'varchar(1)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()
                    .check(sql`gender IN ('M', 'F')`)

            )
            .addColumn('cpf', 'varchar(14)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.unique()
                    .notNull()

            )
            .addColumn('phone', 'varchar(15)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()

            )
            .addColumn('email', 'varchar(254)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.unique()
                    .notNull()

            )
            .addColumn('subject', 'varchar(50)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()

            )
            .addColumn('registered', 'boolean', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()

            )
            .addColumn('subject_id', 'integer', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.references('subjects.id')
                    .onDelete('cascade')
                    .onUpdate('cascade')

            )
            .addColumn('teacher_cpf', 'varchar(14)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

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
