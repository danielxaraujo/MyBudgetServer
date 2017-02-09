import * as logger from 'logops';
import * as monk from 'monk';
import { Promise } from 'core-js';
import { Service } from 'typedi';

// Classe genérica para manipulação do MongoDB
@Service()
export class DataAccess {

    private _dbConnection = null;

    // Construtor da classe
    constructor() {
        this.openDbConnection();
    }

    // Abrir conexão com o MongoDB
    private openDbConnection() {
        if (this._dbConnection == null) {
            this._dbConnection = monk('mongodb://127.0.0.1:27017/budget');
            logger.info('## Conexâo iniciada com o MongoDB');
        }
    }

    // Fechar conexão com o MongoDB
    public closeDbConnection() {
        if (this._dbConnection) {
            this._dbConnection.close();
            this._dbConnection = null;
        }
    }

    // Retornar todos os elementos de um documento
    public getAllDocuments(collectionName: string): Promise<{}> {
        if (this._dbConnection) {
            return this._dbConnection.get(collectionName).find();
        }
    }
}