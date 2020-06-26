const Hapi = require('@hapi/hapi');
const Path = require('path');
const joi = require("@hapi/joi")


const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });


    server.route({
        path: '/login',
        method: 'POST',
        handler: (req, h) => {
            return "login successful";
        },
        options: {
            validate: {
               payload: joi.object({
                   isGuest: joi.boolean(),
                   username: joi.string(),
                   accessToken: joi.string().alphanum(),
                   password: joi.string().alphanum()
               })
               .options({allowUnknown: true})
               .without('password', 'accessToken')
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