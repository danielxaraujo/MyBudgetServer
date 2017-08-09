import * as logger from 'logops';
import { MongoClient, Db, ObjectID, InsertOneWriteOpResult } from 'mongodb';
import { Service } from 'typedi';

// Classe genérica para manipulação do MongoDB
@Service()
export class DataAccess<T> {

    private _db: Db = null;
    private _shareItUrl: string = 'mongodb://127.0.0.1:27017/budget';

    // Abrir conexão com o MongoDB
    public async openDbConnection() {
		this._db = await MongoClient.connect(this._shareItUrl);
		logger.info('## Conectado com sucesso com o MongoBD');
    }

    // Fechar conexão com o MongoDB
    public async closeDbConnection() {
        await this._db.close();
    }

    // Realiza uma busca por id
    public async getDocumentById(collectionName: string, id: string | ObjectID): Promise<T> {
        if (typeof id === 'string') {
            id = new ObjectID(id);
        }
        return this._db.collection<T>(collectionName).findOne({_id: id});
    }

    // Realiza uma busca em uma coleção
    public async getDocument(collectionName: string, query: {}) : Promise<T> {
        return this._db.collection<T>(collectionName).findOne(query);
    }

    // Realiza uma busca em uma coleção
    public async getDocuments(collectionName: string, query = {}) : Promise<T[]> {
        return this._db.collection<T>(collectionName).find(query).toArray();
    }

    // Inserir um documento na coleção
    public async insertDocument(collectionName: string, document: T) : Promise<InsertOneWriteOpResult> {
        return this._db.collection<T>(collectionName).insertOne(document);
    }
}