import dotenv from "dotenv";
import http from "http";
import app from "./src";

// Load environment variables from a .env file
dotenv.config();

/** --------------------------------------------------------------------------------------------------------------------
 * The port number on which the server will run.
 * It is retrieved from the environment variable `PORT` or defaults to `3001`.
 */
const PORT: string = process.env.APPLICATION_PORT || '3001';
const NAME: string = process.env.APPLICATION_NAME || 'SERVICE';
const TIME: string = process.env.APPLICATION_TIME || '1100';

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
    console.log(`-> app ${NAME}   is Runing on http://localhost:${PORT}`);
  }, Number(TIME));
});
