import { Request, RequestHandler, Response } from 'express';
import { Query } from '../interfaces/Query.js';
import { Studant } from '../interfaces/Studant.js';
import { validation } from '../../api/middleware/Validation.js';  
import { bodyValidation } from '../validations/schemas/studant/StudentBody.Validation.js'; 
import { queryValidation } from '../validations/schemas/studant/StudentQuery.Validation.js';
import { paramsValidation } from '../validations/schemas/studant/StudentParams.Validation.js';
import { Param } from '../interfaces/Param.js';


export default class StudentsController {

    /**
     * Valida a requisição (body) do método register.
    */
    public registerValidation: RequestHandler = validation ({
        
        body: bodyValidation

    });

    /**
     * Registra o estudante na base de dados.
     * Recebe uma requisição body. 
    */
    public async register (req: Request<{}, {}, Studant>, res: Response): Promise<void> {

        console.log('Requisição recebida em register');
        console.log('Body', req.body);

        res.status(500).send('register: Não implementado');

    };

    /**
     * Valida os parametros (params) do método updateByCpf.
     */
    public updateByCpfValidation: RequestHandler = validation({
        
        params: paramsValidation

    });

    /**
     * Atualiza as informações do estudante já matriculado.
     * Utiliza o cpf do estudante, como parametro.
    */
    public async updateByCpf (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getBySubjactId');
        console.log('Params:', req.params);

        res.status(500).send('getBySubjact: Não implementado');

    };

    /**
     * Valida a requisição (query) do método getAll.
    */
    public getAllValidation: RequestHandler = validation ({
        
        query: queryValidation

    });

    /**
     * Retorna todos os estudantes cadastrados na base de dados.
     * Recebe requisições: headers e query.
    */
    public async getAll (req: Request<{}, {}, {}, Query>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getAllStudants');
        console.log('Headers:', req.headers);
        console.log('Query:', req.query);

        res.status(500).send('getAllStudants: Não implementado');
        
    };

    /**
     * Valida os parametros (params) do método getById.
    */
    public getByIdValidation: RequestHandler = validation ({
        
        params: paramsValidation
        
    });
        
    /**
     * Retorna o estudante com o id especificado.
     * Recebe parametros (params).
    */
    public async getById (req: Request<Param>, res: Response): Promise<void> {

        console.log('Requisição recebida em getById');
        console.log('Params:', req.params);
        
        res.status(500).send('getById: Não implementado');
        
    };
    
    /**
     * Valida os parametros (params) do método getByCpf.
    */
    public getByCpfValidation: RequestHandler = validation ({
        
        params: paramsValidation

    });

    /**
     * Retorna o estudante com o cpf especificado.
     * Recebe um parametro (param) na url.
    */
    public async getByCpf (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getByCpf');
        console.log('Params:', req.params);

        res.status(500).send('getByCpf: Não implementado');

    };

    /**
     * Valida os parametros (params) do método getByName.
    */
    public getByNameValidation: RequestHandler = validation ({
        
        params: paramsValidation

    });

    /**
     * Retorna o estudante com o nome especificado.
    */
    public async getByName (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getByName');
        console.log('Params:', req.params);

        res.status(500).send('getByName: Não implementado');

    };


    /**
     * Valida os parametros (params) do método getBySubjectId.
     */
    public getBySubjectIdValidation: RequestHandler = validation({
        
        params: paramsValidation

    });

    /**
     * Retorna os estudantes matriculados na matéria.
     * Utiliza o id da matéria, como parametro.
    */
    public async getBySubjectId (req: Request<Param>, res: Response): Promise<void> {
        
        console.log('Requisição recebida em getBySubjactId');
        console.log('Params:', req.params);

        res.status(500).send('getBySubjact: Não implementado');

    };

    /**
     * Valida os parametros (params) do método removeByCpf.
     */
    public removeByCpfValidation: RequestHandler = validation({
        
        params: paramsValidation

    });

    /**
     * Remove o estudante, com o cpf especificado, da base de dados.
    */
    public async removeByCpf (req: Request<Param>, res: Response): Promise<void> {

        console.log('Requisição recebida em removeStudantByCpf');
        console.log('Params:', req.params);

        res.status(500).send('removeStudantByCpf: Não implementado');

    };

};
