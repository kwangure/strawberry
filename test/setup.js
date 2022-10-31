import { createServer } from 'vite';

export async function setup() {
    const server = await createServer({
        server: { port: 1337 },
    });

    await server.listen();

    return async () => {
        await server.close();
    }
}