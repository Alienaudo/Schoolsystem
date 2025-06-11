import { ColumnDefinitionBuilder, Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {

    try {

        await db.schema
            .createTable('teachers')
            .ifNotExists()
            .addColumn('id', 'uuid', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.defaultTo(sql`gen_random_uuid()`)

            )
            .addColumn('name', 'varchar(150)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()

            )
            .addColumn('birthdate', 'date', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()

            )
            .addColumn('gender', 'char', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.notNull()

            )
            .addColumn('cpf', 'varchar(14)', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

                col.unique()
                    .notNull()
                    .primaryKey()

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
            .addColumn('subject_id', 'integer', (col: ColumnDefinitionBuilder): ColumnDefinitionBuilder =>

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
