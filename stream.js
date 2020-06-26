const Hapi = require('@hapi/hapi');
const fs = require('fs');
const Path = require('path');
const Rot13 = require('rot13-transform');

const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return fs.createReadStream(Path.join(__dirname, 'input.txt')).pipe(Rot13());
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