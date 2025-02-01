import dotenv from "dotenv";
import http from "http";
import app from "./src";
import path from "path";

// Load environment variables from a .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

/** --------------------------------------------------------------------------------------------------------------------
 * The port number on which the server will run.
 * It is retrieved from the environment variable `PORT` or defaults to `3001`.
 */
const PORT: string = process.env.APPLICATION_PORT || '3002';
const NAME: string = process.env.APPLICATION_NAME || 'FINANCIAL';
const TIME: string = process.env.APPLICATION_TIME || '1200';

/** --------------------------------------------------------------------------------------------------------------------
 * Creates an HTTP server instance using the Express application.
 */
const server = http.createServer(app);

/** --------------------------------------------------------------------------------------------------------------------
 * Starts the HTTP server and listens on the specified port.
 * Logs a message indicating successful server connection.
 */
server.listen(PORT, () => {
  setTimeout(() => {
    console.log(` -> app ${NAME} is Runing on http://localhost:${PORT}`);
    console.log('\n================================================================================================\n');
  }, Number(TIME));
});
