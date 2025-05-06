import { Request, RequestHandler, Response } from "express";
import { Param } from "../interfaces/Param.js";
import { Query } from "../interfaces/Query.js";
import { paramsValidation } from "../validations/schemas/subject/SubjectParams.Validation.js";
import { queryValidation } from "../validations/schemas/subject/SubjactQuery.Validation.js";
import { provRegister, provUpdate } from "../../database/providers/Subject.Provider.js";
import { Subjects } from "../../database/models/kysely-types.js";
import validation from "../../api/middleware/Validation.js";
import { bodyValidation } from "../validations/schemas/subject/SubjectBody.Validation.js";

export default class SubjectController {

    /**
     * Valida a mequisição (body) do método register.
    */
    public registerValidation: RequestHandler = validation({

        body: bodyValidation

    });

    /**
     * Registra a matéria na base de dados.
     * Recebe uma requisição body. 
    */
    public async register(req: Request<{}, {}, Subjects>, res: Response): Promise<void> {

        console.log('Requisição recebida em register');
        console.log('Body', req.body);

        const result = await provRegister(req.body);

        if (result instanceof Error) {

            res.send(500).json({

                errors: {

                    default: result.message,

                }

            });

        }

        console.log(result);

        res.status(201).send({ id: result });

    };

    /**
     * Valida os parametros (params) do método update.
     */
    public updateValidation: RequestHandler = validation({

        params: paramsValidation

    });

    /**
     * Atualiza as informações da matéria.
     * Utiliza o id da matéria, como parametro.
    */
    public async update(req: Request<{}, {}, Subjects>, res: Response): Promise<void> {

        console.log('Requisição recebida em update');
        console.log('Params:', req.body);

        const result = await provUpdate(req.body);

        if (result instanceof Error) {

            res.status(500).json({

                errors: {

                    default: result.message,

                }

            })

        }

        res.status(201).send({ id: result });

    };

    /**
     * Valida a requisição (query) do método getAll.
    */
    public getAllValidation: RequestHandler = validation({

        query: queryValidation

    });

    /**
     * Retorna todos as metérias cadastrados na base de dados.
     * Recebe requisições: headers e query.
    */
    public async getAll(req: Request<{}, {}, {}, Query>, res: Response): Promise<void> {

        console.log('Requisição recebida em getAll');
        console.log('Headers:', req.headers);
        console.log('Query:', req.query);

        res.status(500).send('getAll: Não implementado');

    };

    /**
     * Valida os parametros (params) do método getByIdValidation.
    */
    public getByIdValidation: RequestHandler = validation({

        params: paramsValidation

    });

    /**
     * Retorna a metéria com o id especificado.
     * Recebe parametros (params).
    */
    public async getById(req: Request<Param>, res: Response): Promise<void> {

        console.log('Requisição recebida em getById');
        console.log('Params:', req.params);

        res.status(500).send('getById: Não implementado');

    };

    /**
     * Valida os parametros (params) do método getTeacherBySubject.
     */
    public removeValidation: RequestHandler = validation({

        params: paramsValidation

    });

    /**
     * Remove a metéria, com o id especificado, da base de dados.
    */
    public async remove(req: Request<Param>, res: Response): Promise<void> {

        console.log('Requisição recebida em removeByCpf');
        console.log('Params:', req.params);

        res.status(500).send('removeByCpf: Não implementado');

    };

};
