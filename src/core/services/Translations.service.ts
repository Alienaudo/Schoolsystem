export const ptBrErros = {

    // Gerais
    'any.required': '"{#label}" é obrigatório',
    'any.only': '"{#label}" deve ser um dos seguintes: {#valids}',
    'any.unknown': '"{#label}" não é permitido',

    // String
    'string.base': '"{#label}" deve ser uma string',
    'string.empty': '"{#label}" não pode estar vazio',
    'string.min': '"{#label}" deve ter pelo menos {#limit} caracteres',
    'string.max': '"{#label}" deve ter no máximo {#limit} caracteres',
    'string.length': '"{#label}" deve ter exatamente {#limit} caracteres',
    'string.pattern.base': '"{#label}" não corresponde ao padrão exigido',
    'string.email': '"{#label}" deve ser um e-mail válido',
    'string.uri': '"{#label}" deve ser uma URL válida',

    // Number
    'number.base': '"{#label}" deve ser um número',
    'number.min': '"{#label}" deve ser maior ou igual a {#limit}',
    'number.max': '"{#label}" deve ser menor ou igual a {#limit}',
    'number.greater': '"{#label}" deve ser maior que {#limit}',
    'number.less': '"{#label}" deve ser menor que {#limit}',
    'number.integer': '"{#label}" deve ser um número inteiro',

    // Boolean
    'boolean.base': '"{#label}" deve ser um valor booleano',

    // Array
    'array.base': '"{#label}" deve ser uma lista',
    'array.min': '"{#label}" deve conter pelo menos {#limit} itens',
    'array.max': '"{#label}" deve conter no máximo {#limit} itens',
    'array.length': '"{#label}" deve conter exatamente {#limit} itens',
    'array.includes': '"{#label}" deve incluir itens válidos',

    // Object
    'object.base': '"{#label}" deve ser um objeto',
    'object.unknown': 'O campo "{#label}" não é permitido neste objeto',

    // Date
    'date.base': '"{#label}" deve ser uma data válida',
    'date.min': '"{#label}" deve ser posterior a {#limit}',
    'date.max': '"{#label}" deve ser anterior a {#limit}',

    // Outros
    'alternatives.match': '"{#label}" não corresponde a nenhuma das opções permitidas'

};
