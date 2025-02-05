//import { jest, test } from '@jest/globals';
import { executeQuery, QUERIES } from '../src/database/migration/createDataBase';
import { pool } from '../src/database/connections/creatConnection';


// Mock do pool e da conexão
jest.mock('../src/database/connections/creatConnection.ts', () => ({
    pool: {
        getConnection: jest.fn(),

    },

}));

describe('Testes para createDataBase', () => {
    let mockConn: any;
    
    beforeEach(() => {
        // Criação de um mock para a conexão do pool
        mockConn = {
            query: jest.fn(),
            end: jest.fn()
        };

        const mockedConnection = pool as jest.Mocked<typeof pool>;
        mockedConnection.getConnection.mockResolvedValue(mockConn);

    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    test('Deve executar a query de criação do banco de dados', async () => {
        await executeQuery(QUERIES.createDataBase);
        
        // Verifica que a query correta foi chamada
        expect(mockConn.query).toHaveBeenCalledWith('USE ScholarDB;');
        expect(mockConn.query).toHaveBeenCalledWith(QUERIES.createDataBase);

        // Verifica que a conexão foi encerrada
        expect(mockConn.end).toHaveBeenCalled();

    });

});

