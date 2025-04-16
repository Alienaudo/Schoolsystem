import { DB } from "database/models/kysely-types.js";
import { Kysely } from "kysely";

export async function seed(db: Kysely<DB>): Promise<void> {

    await db
        .insertInto('teachers')
        .values([

            {
                name: 'Teste professor',
                birthdate: '2025-01-02 13:30:35.556',    // 'YYYY-MM-DD HH:MM:SS.ffffff' -> MariaDB
                gender: 'M',
                cpf: '549.153.484-57',
                phone: '(95) 97537-2348',
                email: 'exemplodeemail@exemplo.com.br',
                subject: 'Matemática',
                subjectId: 1
            },

        ])
        .execute();

    console.log('Seed 02_teacher concluida com êxito!');

};
