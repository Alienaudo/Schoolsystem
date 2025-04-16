import server from './server.js';
import dotenv from 'dotenv';

dotenv.config();

const host: string = process.env.HOST || 'localhost';
const port: number = parseInt(process.env.PORT_SERVER || '3000', 10);

server.listen(port, host, (err: any) => {

    if (err) throw new Error(err.message);
    
	console.log(`Server running at http://${host}:${port}/`);
    
});
