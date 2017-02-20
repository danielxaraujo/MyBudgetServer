import { Promise } from 'core-js';
import { ObjectID, InsertOneWriteOpResult } from 'mongodb';
import { DataAccess } from './data.access';
import { Service, Inject } from 'typedi';

@Service()
export class TransactionDAO {

    @Inject()
    private _dataAccess: DataAccess;

    public getTransaction(query: {}) : Promise<any[]> {
        return this._dataAccess.getDocuments('transactions', query);
    }

    public getAllTransaction() : Promise<any[]> {
        return this._dataAccess.getDocuments('transactions');
    }

    public insertTransaction(transaction: {}) : Promise<InsertOneWriteOpResult> {
        return this._dataAccess.insertDocument('transactions', transaction);
    }
}