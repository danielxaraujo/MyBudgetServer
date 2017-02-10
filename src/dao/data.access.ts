import 'core-js/es7/reflect';
import * as logger from 'logops';
import { MongoClient, Db, ObjectID, } from 'mongodb';
import { Promise } from 'core-js';
import { Service } from 'typedi';

// Classe genérica para manipulação do MongoDB
@Service()
export class DataAccess {

    private _db: Db = null;
    private _shareItUrl: string = 'mongodb://127.0.0.1:27017/budget';

    // Abrir conexão com o MongoDB
    public openDbConnection() {
        return MongoClient.connect(this._shareItUrl).then(db => {
            this._db = db;
            logger.info('## Conectado com sucesso com o MongoBD');
        }).catch(err => {
            logger.info('## Erro ao tentar se conectar com MongoBD: %j', err);
        });;
    }

    // Fechar conexão com o MongoDB
    public closeDbConnection() {
        this._db.close();
    }

    // Realiza uma busca em uma coleção
    public findDocument(collectionName: string, query: {}) : Promise<any[]> {
        return this._db.collection(collectionName).find(query).toArray();
    }

    // Retornar todos os elementos de um documento
    public findAllDocuments(collectionName: string) : Promise<any[]> {
        return this._db.collection(collectionName).find().toArray();
    }
}