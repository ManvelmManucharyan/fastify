import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import axios, { AxiosResponse } from 'axios';

const server2: FastifyInstance  = fastify();
const port: number = Number(process.env.PORT2) || 3002;

server2.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    try {
        reply.send('Hello world!: Server 2');
    } catch (error: any) {
        console.error('Error', error);
        reply.code(500).send('Internal Server Error');
    }
});

server2.get('/answer-server1', (request: FastifyRequest, reply: FastifyReply) => {
    try {
        reply.send('Hello from Server 2');
    } catch (error: any) {
        console.error('Error', error);
        reply.code(500).send('Internal Server Error');
    }
});

server2.get('/connect-server1', async (request: FastifyRequest, reply: FastifyReply) => {
    try {        
        const response: AxiosResponse = await axios.get(`http://localhost:${process.env.PORT1}/answer-server2`);
        reply.send(response.data);
    } catch (error: any) {
        console.error('Error fetching data:', error);
        reply.code(500).send('Internal Server Error');
    }
});

server2.listen({ port }, (err: Error | null, address: string) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});