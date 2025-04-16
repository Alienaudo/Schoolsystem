import { DB } from "database/models/kysely-types.js";
import { Kysely } from "kysely";

export async function seed(db: Kysely<DB>): Promise<void> {

    await db
        .insertInto('subjects')
        .values([

            {

                subjectName: 'Matemática',
                hours: 36.5,
                description: 'A matéria de Matemática explora conceitos fundamentais como álgebra, geometria, cálculo e estatística. Com foco no desenvolvimento do raciocínio lógico e na resolução de problemas, ela é essencial para o entendimento de diversas áreas, como ciências, economia e tecnologia.'

            },
            {

                subjectName: 'Quimica I',
                hours: 34.4,
                description: 'Introdução aos conceitos fundamentais da Química: estrutura atômica, tabela periódica, ligações químicas, reações e estequiometria.'

            },
            {

                subjectName: 'Quimica II',
                hours: 34.4,
                description: 'Estudo aprofundado da Química: soluções, cinética, equilíbrio químico, eletroquímica e termoquímica.'

            },
            {

                subjectName: 'Fisica I',
                hours: 35,
                description: 'Explora os princípios da mecânica clássica: movimento, leis de Newton, trabalho, energia e conservação.'

            },
            {

                subjectName: 'Fisica II',
                hours: 35,
                description: 'Continuação da Física I, com foco em eletricidade, magnetismo, óptica e introdução à física moderna.'

            },
            {

                subjectName: 'Historia',
                hours: 33.6,
                description: 'Análise crítica de eventos e processos históricos, do mundo antigo à contemporaneidade, com foco em contextos sociais, políticos e culturais.'

            },
            {

                subjectName: 'Geografia',
                hours: 34.7,
                description: 'Estudo do espaço geográfico, natureza, sociedade, clima, relevo, globalização, economia e questões ambientais.'

            },
            {

                subjectName: 'Filosofia',
                hours: 24.7,
                description: 'Introdução ao pensamento filosófico, abordando temas como ética, política, existência, conhecimento e lógica.'

            },
            {

                subjectName: 'História da arte',
                hours: 23,
                description: 'Exploração das manifestações artísticas ao longo do tempo, estilos, movimentos, obras e seus contextos históricos.'

            },
            {

                subjectName: 'Lingua Inglesa',
                hours: 23.4,
                description: 'Desenvolvimento da leitura, escrita, fala e escuta em inglês, com foco em vocabulário, gramática e comunicação.'

            },
            {

                subjectName: 'Lingua Portuguesa',
                hours: 23.4,
                description: 'Estudo da língua portuguesa com ênfase em gramática, interpretação de texto, redação e literatura.'

            }

        ])
        .execute();

    console.log('Seed 01_subjacts concluida com êxito!');

};
