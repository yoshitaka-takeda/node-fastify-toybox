import fastify from "fastify";
import * as dotenv from "dotenv";
import pino from "pinojs";
import * as cors from "@fastify/cors";
const env = dotenv.config();

try{
    console.log(cors);
    // console.log(env);

    // console.log(process.env.APP_HOST);

    const app = fastify({
        logger: {
            level: 'info',
            file: './tmp/logs/app_logger.log'
        }
    });

    app.get('/', async (req,res) => {
        console.log(req);

        res.code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'henloO \'woOrld\'' });
    });

    app.options('/', async (req,res) => {
        res.code(200).header('content-type', 'application.json; charset=utf-8')
        .send({ message : 'wOoptions wOoOOoptiOons'});
    });

    app.listen({ port: `${process.env.APP_PORT}`, host: `${process.env.APP_HOST}` }, function (err, address) {
        console.log(address);
        if (err) {
            app.log.error(err)
            process.exit(1)
        }
        app.log.info(`server listening on ${address}`)
    });
}catch(e){
    console.log(e);
}
