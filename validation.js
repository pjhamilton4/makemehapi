const Hapi = require('@hapi/hapi');
const Path = require('path');
const joi = require("@hapi/joi")


const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });


    server.route({
        path: '/chickens/{breed}',
        method: 'GET',
        handler: (req, h) => {
            return `You asked for the chicken ${req.params.breed}`;
        },
        options: {
            validate: {
                params: joi.object({
                    breed: joi.string().required()
                })
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