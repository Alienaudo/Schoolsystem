import knex, { Knex } from "knex";
import connection from "../connection.js";

export async function seed(knex: Knex): Promise<void> {

    await knex('teachers').insert([{

        name: 'Teste professor',
        birthdate: '2025-01-02 13:30:35.556',    // 'YYYY-MM-DD HH:MM:SS.ffffff' -> MariaDB
        gender: 'M',
        cpf: '549.153.484-57',
        phone: '(95) 97537-2348',
        email: 'exemplodeemail@exemplo.com.br',
        subject: 'Matemática',
        subject_id: 1
        
    }])
    .then(() => {

        console.log('Professor cadastrado com êxito!');
        
    })
    .catch(error => {

        console.error('Erro ao cadastrar estudante : ', error.message);

    })
    .finally(() => {
        
        knex.destroy();

    });

};

seed(knex(connection))
