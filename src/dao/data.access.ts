import * as Q from 'q';
import * as assert from 'assert';
import * as logger from 'logops';
import * as monk from 'monk';
import { Collection } from 'mongodb';

// Create a class to manage the data manipulation.
export class DataAccess {

    public dbConnection = null;

    constructor() {
        this.openDbConnection();
    }

    // Open the existing connection.
    private openDbConnection() {
        if (this.dbConnection == null) {
            this.dbConnection = monk('mongodb://127.0.0.1:27017/budget');
            logger.info("** MongoDB = %j", this.dbConnection);
        }
    }

    // Close the existing connection.
    public closeDbConnection() {
        if (this.dbConnection) {
            this.dbConnection.close();
            this.dbConnection = null;
        }
    }

    // Return a Promise of an array od documents
    public getAllDocuments(collectionName: string): any {
        if (this.dbConnection) {
            logger.info("** Consultando Collection = %j", collectionName);
            return this.dbConnection.get(collectionName).find();
        }
    }
}