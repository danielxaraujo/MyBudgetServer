import { Promise } from 'core-js';
import { ObjectID, InsertOneWriteOpResult } from 'mongodb';
import { DataAccess } from './data.access';
import { Service, Inject } from 'typedi';

@Service()
export class AccountDAO {

    @Inject()
    private _dataAccess: DataAccess;

    public getAccount(query: {}) : Promise<any[]> {
        return this._dataAccess.getDocuments('accounts', query);
    }

    public getAllAccount() : Promise<any[]> {
        return this._dataAccess.getDocuments('accounts');
    }

    public insertAccount(transaction: {}) : Promise<InsertOneWriteOpResult> {
        return this._dataAccess.insertDocument('accounts', transaction);
    }
}