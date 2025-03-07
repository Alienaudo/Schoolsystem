import knex, { Knex } from "knex";
import connection from "../connection.js";

export async function seed(knex: Knex): Promise<void> {

    await knex('subjects').insert([{

        subject_name: 'Matemática',
        hours: 36.5,
        description: 'A matéria de Matemática explora conceitos fundamentais como álgebra, geometria, cálculo e estatística. Com foco no desenvolvimento do raciocínio lógico e na resolução de problemas, ela é essencial para o entendimento de diversas áreas, como ciências, economia e tecnologia.'

    }])
    .then(() => {

        console.log('Matéria cadastrado com êxito!');
        
    })
    .catch(error => {

        console.error('Erro ao cadastrar estudante : ', error.message);

    })
    .finally(() => {
        
        knex.destroy();

    });

};

seed(knex(connection))
