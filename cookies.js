const Hapi = require('@hapi/hapi');
const Path = require('path');


const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });

    server.state('session', {
        path: '/',
        encoding: 'base64json',
        ttl: 10,
        domain: 'localhost',
        isSameSite: false,
        isSecure: false,
        isHttpOnly: false
    });

    server.route({
        path: '/check-cookie',
        method: 'GET',
        handler: (req, h) => {
            const { session } = req.state;
            let result;

            if (session) {
                result = { user: 'hapi' };
            } else {
                result = Boom.unauthorized('Missing authentication');
            }

            return result;
        },
        options: {
            state: {
                parse: true,
                failAction: 'log'
            }
        }
    });

    server.route({
        path: '/set-cookie',
        method: 'GET',
        handler: (request, h) => h.response({
            message: 'success'
        }).state('session', { key: 'makemehapi' }),
        options: {
            state: {
                parse: true,
                failAction: 'log'
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