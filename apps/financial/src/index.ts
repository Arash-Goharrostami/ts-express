/** --------------------------------------------------------------------------------------------------------------------
 * @file Main application setup for the Express.js server.
 * This script configures middleware, routes, error handling, and initializes external modules such as cron jobs and MongoDB.
 */
import express from 'express';
import dotenv from "dotenv";
import path from "path";
import database from "../../../libs/database/src";
import process from "node:process";


const app = express();

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

/** Middleware to parse incoming JSON requests. */
app.use(express.json());

/** Middleware to convert JSON data into Excel files. */
// app.use(json2xls.middleware);

/** --------------------------------------------------------------------------------------------------------------------
 * API routes for version 1 of the financial services.
 *
 * @route {string} /api/v1/financial
 */
// app.use('/api/v1/user', v1);
app.get("/", (request: express.Request, response: express.Response) => {
  response.send("test FINANCIAL App!");
});

/** --------------------------------------------------------------------------------------------------------------------
 * Global error handling middleware.
 *
 * @param { Error    } err  - The error object thrown.
 * @param { object   } req  - The Express request object.
 * @param { object   } res  - The Express response object.
 * @param { function } next - The next middleware function.
 */
// app.use((err, req, res, next) => {
//   if (err instanceof ErrorHandler) {
//     // Handle custom error using ErrorHandler
//     console.log({ err });
//     res.status(err.httpCode).json({ httpCode: err.httpCode, statusCode: err.statusCode, message: err.message });
//   } else {
//     // Handle internal server errors
//     console.log({ err });
//     res.status(500).json({ statusCode: StatusCodes.ERROR_INTERNAL });
//   }
// });

export default app;
