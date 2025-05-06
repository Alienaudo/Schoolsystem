import { Subject } from "../../core/interfaces/Subject.js";
import db from "../db.js";
import { DB } from "../models/kysely-types.js";
import { Kysely } from "kysely";

const provRegister = async (subject: DB['subjects']): Promise<number | Error> => {
    const Database: Kysely<DB> = db;

    try {

        const result = await Database
            .insertInto('subjects')
            .values([
                {
                    subjectName: subject.subjectName,
                    hours: Number(subject.hours),
                    description: subject.description,
                },
            ])
            .returning(['id'])
            .executeTakeFirstOrThrow();

        if (typeof result === 'object') {

            return result.id;

        } else if (typeof result === 'number') {

            return result;

        }

        throw new Error('Erro ao cadastar matéria!');

    } catch (error: any) {

        throw new Error(error);

    }

};

const provUpdate = async (subject: DB['subjects']): Promise<number | Error> => {
    const Database: Kysely<DB> = db;

    try {

        const result = await Database
            .updateTable('subjects')
            .set(
                {
                    subjectName: subject.subjectName || undefined,
                    hours: Number(subject.hours) || undefined,
                    description: subject.description || undefined,

                },
            )
            .where('subjects.id', '=', Number(subject.id))
            .returning(['id'])
            .executeTakeFirstOrThrow();

        return result.id;

    } catch (error: any) {

        throw new Error(error);

    }

};

const provGetAll = async (): Promise<{} | Error> => {
    const Database: Kysely<DB> = db;

    try {

        const result: Subject[] = await Database
            .selectFrom('subjects')
            .selectAll('subjects')
            .execute();

        return result;

    } catch (error: any) {

        throw new Error(error);

    }
};

const provGetById = async () => { };

const provRemove = async () => { };

export {

    provRegister,
    provUpdate,
    provRemove,
    provGetById,
    provGetAll

};
