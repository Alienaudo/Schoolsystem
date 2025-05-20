import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {

    try {

        await db.schema
            .createTable('subjects')
            .ifNotExists()
            .addColumn('id', 'serial', (col) =>

                col.primaryKey()

            )
            .addColumn('subject_name', 'varchar(100)', (col) =>

                col.notNull()
                    .unique()

            )
            .addColumn('hours', 'numeric', (col) =>

                col.notNull()

            )
            .addColumn('description', 'varchar(300)', (col) =>

                col.notNull()

            )
            .execute();

        console.log('Tabela subjects criada com êxito!');

    } catch (error: any) {

        console.error('Erro ao criar tabela subjects: ', error.message);
        throw error;

    }

};

export async function down(db: Kysely<any>): Promise<void> {

    try {

        await db.schema
            .dropTable('subjects')
            .ifExists()
            .execute();

        console.log('Tabela subjects deletada com êxito!');


    } catch (error: any) {

        console.error('Erro ao deletar tabela: ', error.message);
        throw error;

    }

};
