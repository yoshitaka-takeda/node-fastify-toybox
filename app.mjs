import fastify from "fastify";
import * as dotenv from "dotenv";
import pino from "pinojs";
import * as cors from "@fastify/cors";
import fs from "fs";
import * as fsextra from 'fs-extra';
import { dirname } from "path";
import { fileURLToPath } from "url";
const env = dotenv.config();

try{
    const __dirname = dirname(fileURLToPath(import.meta.url));
    console.log(cors);
    // console.log(env);

    // console.log(process.env.APP_HOST);
    const tmpPath = process.env.TMP_PATH;
    const logDirPath = process.env.PINO_LOGPATH;
    const publicPath = process.env.PUBLICDIR_PATH;
    // console.log(process.env);
    if (fs.existsSync(__dirname + `/${tmpPath}`)) {
        console.log(`The directory /${tmpPath} exists`);
    } else {
        console.log(`The directory /${tmpPath} does NOT exist`);
        fs.mkdirSync(__dirname + `/${tmpPath}`,{recursive: true}, (err) => {
            if (err) throw err;
        });
    }

    if (fs.existsSync(__dirname + `/${publicPath}`)) {
        console.log(`The directory /${publicPath} exists`);
    } else {
        console.log(`The directory /${publicPath} does NOT exist`);
        fs.mkdirSync(__dirname + `/${publicPath}`,{recursive: true}, (err) => {
            if (err) throw err;
        });
    }

    if (fs.existsSync(__dirname + `/${logDirPath}`)) {
        console.log(`The directory /${logDirPath} exists`);
    } else {
        console.log(`The directory /${logDirPath} does NOT exist`);
        fs.mkdirSync(__dirname + `/${logDirPath}`,{recursive: true}, (err) => {
            if (err) throw err;
        });
    }
    const d = new Date();

    // console.log(`${d.getFullYear()}-${((d.getMonth() + 1) < 10)? '0' + (d.getMonth()+1):(d.getMonth()+1)}-${d.getDate()}`);
    const app = fastify({
        logger: {
            level: 'info',
            file: `./tmp/logs/${d.getFullYear()}-${(d.getMonth()+1 < 10)? '0' + (d.getMonth()+1):(d.getMonth()+1)}-${(d.getDate() < 10?'0'+d.getDate():d.getDate())}${ process.env.PINO_LOGFILE }`
        },
        trustProxy: true,
    });

    app.get('/', async (req,res) => {
        console.log(req);

        res.code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'henloO \'woOrld\'' });
        app.log.info(`'/' get accessed`);

        console.log(req);
    });

    app.options('/', async (req,res) => {
        console.log(req);

        res.code(200)
        .header('content-type', 'application.json; charset=utf-8')
        .send({ message : '\'wOoptions\' wOoOOoptiOons' });
        app.log.info(`'/' options accessed`);

        console.log(res);
    });

    app.get('/test', async (req,res) => {
        console.log(req);

        res.code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'henloO \'woOrld\'' });
        app.log.info(`'/test' get accessed`);

        console.log(res);
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
