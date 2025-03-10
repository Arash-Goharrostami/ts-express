import dotenv from "dotenv";
import http from "http";
import app from "./src";
import path from 'path';

// Load environment variables from a .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

/** --------------------------------------------------------------------------------------------------------------------
 * The port number on which the server will run.
 * It is retrieved from the environment variable `PORT` or defaults to `3000`.
 */
const PORT: string = process.env.APPLICATION_PORT || '3000';
const NAME: string = process.env.APPLICATION_NAME || 'USER';
const TIME: string = process.env.APPLICATION_TIME || '1000';

/** --------------------------------------------------------------------------------------------------------------------
 * Creates an HTTP server instance using the Express application.
 */
const server = http.createServer(app);

console.log(new Date());

/** --------------------------------------------------------------------------------------------------------------------
 * Starts the HTTP server and listens on the specified port.
 * Logs a message indicating successful server connection.
 */
server.listen(PORT, () => {
  console.log('\n================================================================================================\n');
  setTimeout(() => {
    console.log('\n------------------------------------------------------------------------------------------------\n');
    console.log(` -> app ${NAME}      is Runing on http://localhost:${PORT}`);
  }, Number(TIME));
});
