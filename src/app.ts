import * as express from 'express';
import * as expressLogging from 'express-logging';
import * as logger from 'logops';
import { json, urlencoded } from "body-parser";
import { LoginController, UserController } from './controllers';

// Criar uma instância do servidor Express
const app: express.Application = express();

app.use(expressLogging(logger));
logger.info("## Inicializando o Log");

app.use(json());
app.use(urlencoded({ extended: true }));

// Porta que o express irá escutar as requisições
const port: number = process.env.PORT || 3000;

// Montando o Controller para gerenciar os usuários 
app.use('/', LoginController);
app.use('/api/users', UserController);

// Iniciar o servidor na porta especificada
app.listen(port, () => {
    // Mensagem de inicialização com sucesso
    logger.info(`## Escutando no endereço: http://localhost:${port}/`);
});