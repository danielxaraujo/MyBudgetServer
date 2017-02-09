import 'core-js/es7/reflect';
import * as logger from 'logops';
import { MongoClient, Db, ObjectID, Collection, Cursor } from 'mongodb';
import { Promise, Reflect } from 'core-js';
import { Service } from 'typedi';

// Classe genérica para manipulação do MongoDB
@Service()
export class DataAccess {

    private _dbConnection: Db = null;

    // Construtor da classe
    constructor() {
        this.openDbConnection();
    }

    // Abrir conexão com o MongoDB
    private openDbConnection() {
        if (this._dbConnection == null) {
            MongoClient.connect('mongodb://127.0.0.1:27017/budget', (err, db) => {
                if(err) throw err;
                this._dbConnection = db;
            });
        }
    }

    // Fechar conexão com o MongoDB
    public closeDbConnection() {
        if (this._dbConnection) {
            this._dbConnection.close();
            this._dbConnection = null;
        }
    }

    // Realiza uma busca em uma coleção
    public find(collectionName: string, query: {}): Cursor {
        if (this._dbConnection) {
            return this._dbConnection.collection(collectionName).find({name: 'Daniel Xavier Araújo'});
        }
    }

    // Retornar todos os elementos de um documento
    public findAll(collectionName: string): Cursor {
        if (this._dbConnection) {
            return this._dbConnection.collection(collectionName).find();
        }
    }
}