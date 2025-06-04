import { Request, RequestHandler, Response } from "express";
import { Param } from "../interfaces/Param.js";
import { Query } from "../interfaces/Query.js";
import { paramsValidation } from "../validations/schemas/subject/SubjectParams.Validation.js";
import { queryValidation } from "../validations/schemas/subject/SubjectQuery.Validation.js";
import { provCount, provGetAll, provGetById, provRegister, provRemove, provUpdate } from "../../database/providers/Subject.Provider.js";
import { Subjects } from "../../database/models/kysely-types.js";
import { validation } from "../../api/middleware/Validation.js";
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
     * Retorna o id da matéria cadastrada.
    */
    public async register(req: Request<{}, {}, Subjects>, res: Response): Promise<void> {

        try {

            if (res.headersSent) return;

            console.log('Requisição recebida em register');
            console.log('Body', req.body);

            const result = await provRegister(req.body);

            if (result instanceof Error) {

                res.status(500).json({

                    errors: {

                        default: result.message,

                    }

                });

            }

            res.status(201).json({

                id: result

            });

        } catch (error: any) {

            res.status(500).json({

                errors: {

                    default: error.message,

                }

            });

        }

    };

    /**
     * Valida os parametros (params) do método update.
     */
    public updateValidation: RequestHandler = validation({

        body: bodyValidation

    });

    /**
     * Atualiza as informações da matéria.
     * Utiliza o id da matéria, como parametro.
     * Retorna o id da matéria.
    */
    public async update(req: Request<{}, {}, Subjects, Query>, res: Response): Promise<void> {

        try {

            if (res.headersSent) return;

            console.log('Requisição recebida em update');
            console.log('Params:', req.query.id, req.body);

            if (!req.query.id) {

                res.status(400).json({

                    errors: {

                        default: 'Parametro "id" obrigatório.',

                    },

                })

                return;

            }

            const result = await provUpdate(req.query.id, req.body);

            if (result instanceof Error) {

                res.status(500).json({

                    errors: {

                        default: result.message,

                    }

                })

            }

            res.status(204).json({

                id: result

            });

        } catch (error: any) {

            res.status(500).json({

                errors: {

                    default: error.message,

                }

            })

        }

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
     * Retorna um json com as matéria encontradas.
    */
    public async getAll(req: Request<{}, {}, {}, Query>, res: Response): Promise<void> {

        try {

            if (res.headersSent) return;

            console.log('Requisição recebida em getAll');
            console.log('Headers:', req.headers);
            console.log('Query:', req.query);

            const result = await provGetAll(

                req.query.page || 1,
                req.query.limit || 7,
                req.query.filter || ''

            );

            const count = await provCount(req.query.filter || '');

            if (result instanceof Error) {

                res.status(500).send({

                    errors: {

                        default: result.message,

                    }

                })

                return;

            }

            if (count instanceof Error) {

                res.status(500).send({

                    errors: {

                        default: count.message,

                    }

                })


                return;

            }

            res.set('access-control-expose-headers', 'x-total-count');
            res.set('x-total-count', `${count}`);

            res.status(200).send(result);

        } catch (error) {

            res.status(500).send({

                errors: {

                    default: error,

                }

            })

        }

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
     * Retorna um json com a matéria.
    */
    public async getById(req: Request<Param>, res: Response): Promise<void> {

        try {

            if (res.headersSent) return;

            console.log('Requisição recebida em getById');
            console.log('Params:', req.params);

            if (!req.params.id) {

                res.status(400).json({

                    errors: {

                        default: 'O paramêtro "id" precisa ser informado.',

                    }

                });

                return;

            }

            if (typeof req.params.id === 'string') {

                res.status(400).json({

                    errors: {

                        default: 'Favor informar um número.',

                    }

                });

                return;

            }


            const result = await provGetById(req.params.id);

            if (result instanceof Error) {

                res.status(500).json({

                    error: {

                        default: result.message,

                    }

                })

                return;

            }

            res.status(200).json(result);

        } catch (error) {

            res.status(500).json({

                error: {

                    default: error,

                }

            })

        }

    };

    /**
     * Valida os parametros (params) do método removeValidation.
     */
    public removeValidation: RequestHandler = validation({

        params: paramsValidation

    });

    /**
     * Remove a metéria, com o id especificado, da base de dados.
    */
    public async remove(req: Request<{}, {}, {}, Query>, res: Response): Promise<void> {

        try {

            if (res.headersSent) return;

            console.log('Requisição recebida em remove');
            console.log('Params:', req.query.id);

            if (!req.query.id) {

                res.status(400).json({

                    errors: {

                        default: 'O paramêtro "id" precisa ser informado.',

                    }

                });

                return;

            }

            const result = await provRemove(Number(req.query.id));

            if (result instanceof Error) {

                res.status(500).json({

                    error: {

                        default: result.message,

                    }

                })

                return;

            }

            res.status(204).send();

        } catch (error) {

            res.status(500).json({

                error: {

                    default: error,

                }

            })

        }

    };

};
