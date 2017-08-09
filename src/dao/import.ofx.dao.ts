import { ObjectID, InsertOneWriteOpResult } from 'mongodb';
import { Service, Container } from 'typedi';
import { DataAccess } from './data.access';
import { TransactionDAO } from '../dao';
import { Transaction } from "../to";

const transactionDAO: TransactionDAO = Container.get(TransactionDAO);

@Service()
export class ImportOfxDao {

    public async importTransaction(transaction: Transaction) : Promise<Transaction> {
		return transactionDAO.insertTransaction(transaction);
    }
}