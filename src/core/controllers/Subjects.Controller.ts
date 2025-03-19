import { Request, RequestHandler, Response } from "express";
import { bodyValidation } from "../validations/schemas/subject/SubjectBody.Validation.js";
import { validation } from "../../api/middleware/Validation.js";
import { Subject } from "../interfaces/Subject.js";
import { Param } from "../interfaces/Param.js";
import { Query } from "../interfaces/Query.js";
import { paramsValidation } from "../validations/schemas/subject/SubjectParams.Validation.js";
import { queryValidation } from "../validations/schemas/subject/SubjactQuery.Validation.js";

export default class SubjectController {

    /**
     * Valida a requisição (body) do método register.
    */
    public registerValidation: RequestHandler = validation ({
        
        body: bodyValidation

    });

    /**
     * Registra a matéria na base de dados.
     * Recebe uma requisição body. 
    */
    public async register (req: Request<{}, {}, Subject>, res: Response): Promise<void> {

        console.log('Requisição recebida em register');
        console.log('Body', req.body);

        res.status(500).send('register: Não implementado');

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
    public async update (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em update');
        console.log('Params:', req.params);

        res.status(500).send('update: Não implementado');

    };

    /**
     * Valida a requisição (query) do método getAll.
    */
    public getAllValidation: RequestHandler = validation ({
        
        query: queryValidation

    });

    /**
     * Retorna todos as metérias cadastrados na base de dados.
     * Recebe requisições: headers e query.
    */
    public async getAll (req: Request<{}, {}, {}, Query>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getAll');
        console.log('Headers:', req.headers);
        console.log('Query:', req.query);

        res.status(500).send('getAll: Não implementado');
        
    };

    /**
     * Valida os parametros (params) do método getByIdValidation.
    */
    public getByIdValidation: RequestHandler = validation ({
        
        params: paramsValidation
        
    });
        
    /**
     * Retorna a metéria com o id especificado.
     * Recebe parametros (params).
    */
    public async getById (req: Request<Param>, res: Response): Promise<void> {

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
    public async remove (req: Request<Param>, res: Response): Promise<void> {

        console.log('Requisição recebida em removeByCpf');
        console.log('Params:', req.params);

        res.status(500).send('removeByCpf: Não implementado');

    };

};
