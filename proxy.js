const Hapi = require('@hapi/hapi');
const H2o2 = require('@hapi/h2o2');

const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });

    await server.register(H2o2);

    server.route({
        method: 'GET',
        path: '/proxy',
        handler: {
            proxy: {
                host: '127.0.0.1',
                port: 65535
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();