import { Request, RequestHandler, Response } from "express";
import { validation } from "../../api/middleware/Validation.js";
import { bodyValidation } from "../validations/schemas/teacher/TeacherBody.Validation.js";
import { paramsValidation } from "../validations/schemas/teacher/TeacherParams.Validation.js";
import { Param } from "../interfaces/Param.js"; 
import { queryValidation } from "../validations/schemas/teacher/TeacherQuery.Validation.js";
import { Query } from "../interfaces/Query.js"; 
import { Teacher } from "../interfaces/Teacher.js";

export default class TeacherController {

    /**
     * Valida a requisição (body) do método register.
    */
    public registerValidation: RequestHandler = validation ({
        
        body: bodyValidation

    });

    /**
     * Registra o professor na base de dados.
     * Recebe uma requisição body. 
    */
    public async register (req: Request<{}, {}, Teacher>, res: Response): Promise<void> {

        console.log('Requisição recebida em register');
        console.log('Body', req.body);

        res.status(500).send('register: Não implementado');

    };

    /**
     * Valida os parametros (Param) do método update.
     */
    public updateValidation: RequestHandler = validation({
        
        params: paramsValidation

    });

    /**
     * Atualiza as informações do professor já matriculado.
     * Utiliza o cpf do professor, como parametro.
    */
    public async update (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getTeacherBySubjactId');
        console.log('Params:', req.params);

        res.status(500).send('getTeacherBySubjact: Não implementado');

    };

    /**
     * Valida a requisição (query) do método getAll.
    */
    public getAllValidation: RequestHandler = validation ({
        
        query: queryValidation

    });

    /**
     * Retorna todos os professores cadastrados na base de dados.
     * Recebe requisições: headers e query.
    */
    public async getAll (req: Request<{}, {}, {}, Query>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getAllTeachers');
        console.log('Headers:', req.headers);
        console.log('Query:', req.query);

        res.status(500).send('getAllTeachers: Não implementado');
        
    };

    /**
     * Valida os parametros (params) do método getByIdValidation.
    */
    public getByIdValidation: RequestHandler = validation ({
        
        params: paramsValidation
        
    });
        
    /**
     * Retorna o professor com o id especificado.
     * Recebe parametros (params).
    */
    public async getById (req: Request<Param>, res: Response): Promise<void> {

        console.log('Requisição recebida em getTeacherById');
        console.log('Params:', req.params);
        
        res.status(500).send('getTeacherById: Não implementado');
        
    };
    
    /**
     * Valida os parametros (params) do método getTeacher.
    */
    public getByCpfValidation: RequestHandler = validation ({
        
        params: paramsValidation

    });

    /**
     * Retorna o professor com o cpf especificado.
     * Recebe um parametro (param) na url.
    */
    public async getByCpf (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getTeacherByCpf');
        console.log('Params:', req.params);

        res.status(500).send('getTeacherByCpf: Não implementado');

    };

    /**
     * Valida os parametros (params) do método getByName.
    */
    public getByNameValidation: RequestHandler = validation ({
        
        params: paramsValidation

    });

    /**
     * Retorna o professor com o nome especificado.
    */
    public async getByName (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getTeacherByName');
        console.log('Params:', req.params);

        res.status(500).send('getTeacherByName: Não implementado');

    };


    /**
     * Valida os parametros (params) do método getBySubject.
     */
    public getBySubjectIdValidation: RequestHandler = validation({
        
        params: paramsValidation

    });

    /**
     * Retorna os professores matriculados na matéria.
     * Utiliza o id da matéria, como parametro.
    */
    public async getBySubjectId (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getTeacherBySubjactId');
        console.log('Params:', req.params);

        res.status(500).send('getTeacherBySubjact: Não implementado');

    };

    /**
     * Valida os parametros (params) do método removeValidation.
     */
    public removeValidation: RequestHandler = validation({
        
        params: paramsValidation

    });

    /**
     * Remove o professor, com o cpf especificado, da base de dados.
    */
    public async remove (req: Request<Param>, res: Response): Promise<void> {

        console.log('Requisição recebida em removeTeacherByCpf');
        console.log('Params:', req.params);

        res.status(500).send('removeTeacherByCpf: Não implementado');

    };

};
