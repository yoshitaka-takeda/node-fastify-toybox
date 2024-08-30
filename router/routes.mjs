import fastify from "fastify";
import dotenv from "../configs/environment.mjs";
dotenv.config();
let f = fastify();
let router;

export async function routes(fastify=f, options=null) {

}