const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const env = process.env.NODE_ENV || 'development';

    const server = Hapi.server({
        port: 9000,
        host: env !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server ${env} berjalan pada ${server.info.uri}`);
};

init();
