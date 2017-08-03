import 'core-js/es7/reflect';
import * as logger from 'logops';
import * as express from 'express';
import { json, urlencoded } from "body-parser";
import { ProtectedController, LoginController, UserController, AccountController, TransactionController } from './controllers';
import { DataAccess } from './dao';
import { Container } from 'typedi';

// Criar uma instância do servidor Express
const app: express.Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

// Porta que o express irá escutar as requisições
const port: any = process.env.PORT || 3000;

// Montando o Controller para gerenciar os usuários
app.use('/', LoginController);
//app.use('/api', ProtectedController);
app.use('/api/user', UserController);
app.use('/api/account', AccountController);
app.use('/api/transaction', TransactionController);

// Iniciar o servidor na porta especificada
app.listen(port, () => {
    // Mensagem de inicialização com sucesso
    Container.get(DataAccess).openDbConnection();
    logger.info(`## Escutando no endereço: http://localhost:${port}/`);
});