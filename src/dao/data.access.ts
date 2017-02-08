import * as Q from 'q';
import * as assert from 'assert';
import * as logger from 'logops';
import * as monk from 'monk';
import { Promise } from 'es6-shim';

// Create a class to manage the data manipulation.
export class DataAccess {

    private static dbConnection = null;

    constructor() {
        this.openDbConnection();
    }

    // Open the existing connection.
    private openDbConnection() {
        if (DataAccess.dbConnection == null) {
            DataAccess.dbConnection = monk('mongodb://127.0.0.1:27017/budget');
        }
    }

    // Close the existing connection.
    public closeDbConnection() {
        if (DataAccess.dbConnection) {
            DataAccess.dbConnection.close();
            DataAccess.dbConnection = null;
        }
    }

    // Return a Promise of an array od documents
    public getAllDocuments(collectionName: string): Promise<{}> {
        if (DataAccess.dbConnection) {
            logger.info("** Consultando Collection = %j", collectionName);
            return DataAccess.dbConnection.get(collectionName).find();
        }
    }
}