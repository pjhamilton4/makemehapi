const Hapi = require('@hapi/hapi');
const Path = require('path');

const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/foo/bar/baz/{filename}',
        handler: {
            directory: {
                path: Path.join(__dirname, './public')
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/test',
        handler: (request, h) => {
            return `Hello Folks!`;
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