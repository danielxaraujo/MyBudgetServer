// Import everything from express and assign it to the express variable
import * as express from 'express';
import * as expressLogging from 'express-logging';
import * as logger from 'logops';

// Import WelcomeController from controllers entry point
import { dataAccess } from './dao';
import { UserController } from './controllers';

// Create a new express application instance
const app: express.Application = express();

dataAccess.openDbConnection();

app.use(expressLogging(logger));
logger.info("** LOGGER INICIALIZADO");

// The port the express app will listen on
const port: number = process.env.PORT || 3000;

// Mount the WelcomeController at the /welcome route
app.use('/user', UserController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    logger.info(`Listening at http://localhost:${port}/`);
});