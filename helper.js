const Hapi = require('@hapi/hapi');
const Path = require('path');
const Vision = require('vision');

const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });

    await server.register(Vision);

    server.views({
        engines: {
            html: require('handlebars')
        },
        helpersPath: 'helpers',
        path: Path.join(__dirname, 'templates')
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: {
            view: 'index.html'
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