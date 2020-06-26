const Hapi = require('@hapi/hapi');
const Path = require('path');
const joi = require("@hapi/joi")


const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: Number(process.argv[2] || 8080)
    });


    server.route({
        path: '/upload',
        method: 'POST',
        handler: (request, reply) => new Promise((resolve, reject) => {
            let body = "";
            request.payload.file.on('data', (data) => {
                body += data
            });

            request.payload.file.on('end', () => {
                let result = {
                    description: request.payload.description,
                    file: {
                        data: body,
                        filename: request.payload.file.hapi.filename,
                        headers: request.payload.file.hapi.headers
                    }
                }

                return resolve(result);
            });
        }),
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
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