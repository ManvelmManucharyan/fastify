import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import axios, { AxiosResponse } from 'axios';

const server1: FastifyInstance  = fastify();
const port: number = Number(process.env.PORT1) || 3001

server1.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    try {
        reply.send('Hello world!: Server 1');
    } catch (error: any) {
        console.error('Error', error);
        reply.code(500).send('Internal Server Error');
    }
});

server1.get('/answer-server2', (request: FastifyRequest, reply: FastifyReply) => {
    try {
        reply.send('Hello from Server 1');
    } catch (error: any) {
        console.error('Error', error);
        reply.code(500).send('Internal Server Error');
    }
});

server1.get('/connect-server2', async (request: FastifyRequest, reply: FastifyReply) => {
    try {        
        const response: AxiosResponse  = await axios.get(`http://localhost:${process.env.PORT2}/answer-server1`);    
        reply.send(response.data);
    } catch (error: any) {
        console.error('Error fetching data:', error);
        reply.code(500).send('Internal Server Error');
    }
});

server1.listen({ port }, (err: Error | null, address: string) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});