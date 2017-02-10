import * as logger from 'logops';
import { MongoClient, Db, ObjectID, InsertOneWriteOpResult } from 'mongodb';
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
            throw err;
        });;
    }

    // Fechar conexão com o MongoDB
    public closeDbConnection() {
        this._db.close();
    }

    // Realiza uma busca por id
    public getDocumentById(collectionName: string, id: string | ObjectID): any {
        if (id instanceof String) {
            id = ObjectID.createFromHexString(id);
        }
        return this._db.collection(collectionName).findOne({_id: id});
    }

    // Realiza uma busca em uma coleção
    public getDocuments(collectionName: string, query: {}) : Promise<any[]> {
        return this._db.collection(collectionName).find(query).toArray();
    }

    // Realiza uma busca em uma coleção
    public getOneDocument(collectionName: string, query: {}) : Promise<any[]> {
        return this._db.collection(collectionName).findOne(query);
    }

    // Retorna todos os elementos de uma coleção
    public getAllDocuments(collectionName: string) : Promise<any[]> {
        return this._db.collection(collectionName).find().toArray();
    }

    // Inserir um documento na coleção
    public insertDocument(collectionName: string, document: {}) : Promise<InsertOneWriteOpResult> {
        return this._db.collection(collectionName).insertOne(document);
    }
}