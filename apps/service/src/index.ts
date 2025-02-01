/** --------------------------------------------------------------------------------------------------------------------
 * @file Main application setup for the Express.js server.
 * This script configures middleware, routes, error handling, and initializes external modules such as cron jobs and MongoDB.
 */
import express from 'express';
import database from "../../../libs/database/src";
import process from "node:process";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbInstance = database.MongoDB.getInstance();

dbInstance.connect({
  mongoDBIp      : process.env.MONGO_DB_IP      !,
  mongoDbTime    : process.env.MONGODB_TIME     !,
  mongoDBProt    : process.env.MONGO_DB_PORT    !,
  mongoDbUser    : process.env.MOGNO_DB_USER    !,
  mongoDbName    : process.env.MONGO_DB_NAME    !,
  mongoDbPassword: process.env.MONGO_DB_PASSWORD!,
  mongoDbAuthUser: process.env.MONGO_DB_AUTH_USR!,
});

const app = express();


/** Middleware to parse incoming JSON requests. */
app.use(express.json());


/** --------------------------------------------------------------------------------------------------------------------
 * API routes for version 1 of the financial services.
 *
 * @route {string} /api/v1/financial
 */
app.get("/", (request: express.Request, response: express.Response) => {
  response.send("test SERVICE App!");
});


export default app;
