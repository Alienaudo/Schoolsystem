import supertest from 'supertest'; 

import server from '../src/api/server';

export const testServer = supertest(server);
