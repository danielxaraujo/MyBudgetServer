import { Promise } from 'core-js';
import { ObjectID, InsertOneWriteOpResult } from 'mongodb';
import { DataAccess } from './data.access';
import { TransactionDAO } from '../dao';
import { Service, Container } from 'typedi';

const transactionDAO: TransactionDAO = Container.get(TransactionDAO);

@Service()
export class ImportOfxDao {

    public importOfxFile(content: string) : Promise<any> {
        return null;
    }
}