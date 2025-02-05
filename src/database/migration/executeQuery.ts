import { pool } from '../connections/creatConnection.js';
    
export async function executeQuery(query: string) {
    let conn;

    try {
        conn = await pool.getConnection();

        await conn.query(" USE ScholarDB; ");

        await conn.query(query);

    } catch (err: any) {
        console.error("Erro ao executar query:", err.message);
        throw new Error(err);
        
    } finally {
        if (conn) conn.end();

    }

};
