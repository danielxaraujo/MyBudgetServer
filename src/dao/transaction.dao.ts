//import { Promise } from 'core-js';
import { ObjectID, InsertOneWriteOpResult } from 'mongodb';
import { Service, Inject } from 'typedi';
import { DataAccess } from './data.access';
import { Transaction } from "../to";

@Service()
export class TransactionDAO {

    @Inject()
	private _dataAccess: DataAccess<Transaction>;

    public async getTransactionById(id: string | ObjectID ) : Promise<Transaction> {
        return this._dataAccess.getDocumentById('transactions', id);
    }

    public async getTransactions(query: {}) : Promise<Transaction[]> {
        return this._dataAccess.getDocuments('transactions', query);
    }

    public async getAllTransaction() : Promise<Transaction[]> {
        return this._dataAccess.getDocuments('transactions');
    }

    public async insertTransaction(transaction: Transaction) : Promise<Transaction> {
		let insertResult : InsertOneWriteOpResult = await this._dataAccess.insertDocument('transactions', transaction);
		if (insertResult.insertedCount == 1) {
			transaction._id = insertResult.insertedId;
			return transaction;
		} else {
			return null;
		}
    }
}