import { DB } from "database/models/kysely-types.js";
import { Kysely } from "kysely";

export async function seed(db: Kysely<DB>): Promise<void> {

    await db.insertInto('students')
        .values([

            {
                name: 'Teste aluno',
                birthdate: '2025-01-02 13:30:35.556',    // 'YYYY-MM-DD HH:MM:SS.ffffff' -> MariaDB
                gender: 'M',
                cpf: '509.590.981-27',
                phone: '(95) 97963-5528',
                email: 'exemplodeemail@exemplo.com.br',
                subject: 'Matemática',
                registered: true,
                subjectId: 1,
                teacherCpf: '549.153.484-57'
            },

        ])
        .execute();

    console.log('Seed 03_student concluida com êxito!');

};
