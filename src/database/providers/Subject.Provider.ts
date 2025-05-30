import { Subject } from "../../core/interfaces/Subject.js";
import db from "../db.js";
import { DB } from "../models/kysely-types.js";
import { Kysely } from "kysely";

const Database: Kysely<DB> = db;
type typeDB = DB['subjects'];

const provRegister = async (subject: typeDB): Promise<number | Error> => {

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

        throw new Error('Erro ao registrar!');

    } catch (error: any) {

        throw new Error(error);

    }

};

const provUpdate = async (id: number, body: typeDB): Promise<number | Error> => {

    try {

        const result = await Database
            .updateTable('subjects')
            .set(
                {
                    subjectName: body.subjectName || undefined,
                    hours: Number(body.hours) || undefined,
                    description: body.description || undefined,

                },
            )
            .where('subjects.id', '=', id)
            .returning(['id'])
            .executeTakeFirstOrThrow();

        return result.id;

    } catch (error: any) {

        throw new Error(error);

    }

};

const provGetAll = async (page: number, limit: number, filter: string): Promise<Subject[] | Error> => {

    try {

        const result: Subject[] = await Database
            .selectFrom('subjects')
            .selectAll('subjects')
            .where('subjects.subjectName', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)
            .execute();

        return result;

    } catch (error: any) {

        throw new Error(error);

    }

};

const provCount = async (filter: string = ''): Promise<number | Error> => {

    try {

        const result = await Database
            .selectFrom('subjects')
            .where('subjects.subjectName', 'like', `${filter}`)
            .select(({ fn }) => [

                fn.count<number>('subjects.id').as('count')

            ])
            .executeTakeFirstOrThrow();

        return result.count;

    } catch (error: any) {

        throw new Error(error);

    }

};

const provGetById = async (id: number): Promise<Subject | Error> => {

    try {

        const result = await Database
            .selectFrom('subjects')
            .selectAll('subjects')
            .where('subjects.id', '=', id)
            .executeTakeFirstOrThrow();

        if (!result) return new Error('Registro não emcontrada!');

        return result;

    } catch (error: any) {

        throw new Error(error);

    }

};

const provRemove = async (id: number): Promise<void | Error> => {

    try {

        const result = await Database
            .deleteFrom('subjects')
            .where('subjects.id', '=', id)
            .executeTakeFirstOrThrow();

        if (result.numDeletedRows > 0) result;

    } catch (error: any) {

        throw new Error(error);

    }

};

export {

    provRegister,
    provUpdate,
    provRemove,
    provGetById,
    provGetAll,
    provCount

};
