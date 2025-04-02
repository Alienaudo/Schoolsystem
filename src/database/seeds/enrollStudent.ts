import knex, { Knex } from "knex";
import connection from "../connection.js";

export async function seed(knex: Knex): Promise<void> {

    await knex('students').insert([{

        name: 'Teste aluno',
        birthdate: '2025-01-02 13:30:35.556',    // 'YYYY-MM-DD HH:MM:SS.ffffff' -> MariaDB
        gender: 'M',
        cpf: '509.590.981-27',
        phone: '(95) 97963-5528',
        email: 'exemplodeemail@exemplo.com.br',
        subject: 'Matemática',
        registered: true,
        subject_id: 1

    }])
    .then(() => {

        console.log('Estudante cadastrado com êxito!');
        
    })
    .catch(error => {

        console.error('Erro ao cadastrar estudante : ', error.message);

    })
    .finally(() => {
        
        knex.destroy();

    });

};

seed(knex(connection))
