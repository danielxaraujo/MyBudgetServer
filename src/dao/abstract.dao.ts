import * as Q from 'q';
import * as assert from 'assert';
import * as logger from 'winston';
import { MongoClient, ObjectID } from 'mongodb';

// Create a class to manage the data manipulation.
export class DataAccess {

    public shareItUrl: string = 'mongodb://127.0.0.1:27017/budget';
    public dbConnection: any = null;

    // Open the MongoDB connection.
    public openDbConnection() {
        if (this.dbConnection == null) {
            MongoClient.connect(this.shareItUrl, (err, db) => {
                assert.equal(null, err);
                logger.info("** Connected correctly to MongoDB server.");
                this.dbConnection = db;
            });
        }
    }

    // Close the existing connection.
    public closeDbConnection() {
        if (this.dbConnection) {
            this.dbConnection.close();
            this.dbConnection = null;
        }
    }

    // Insert a new document in the collection.
    public insertDocument(document: any, collectionName: string): any {
        logger.info("** DAL - insertDocument: %j, %j", document, collectionName);
        let deferred: Q.Deferred<{}> = Q.defer();
        this.dbConnection.collection(collectionName).insertOne(document, (err, result) => {
            assert.equal(err, null);
            if (err) {
                deferred.reject(new Error(JSON.stringify(err)));
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    // Return a Promise of an array od documents
    public getAllDocuments(collectionName: string): any {
        let allDocuments = [];
        let deferred: Q.Deferred<{}> = Q.defer();
        if (this.dbConnection) {
            let cursor = this.dbConnection.collection(collectionName).find();
            cursor.each((err, document) => {
                logger.info("** document = %j", document);
                if (err) {
                    deferred.reject(new Error(JSON.stringify(err)));
                }
                if (document) {
                    allDocuments.push(document);
                }
                deferred.resolve(allDocuments);
            });
        }
        return deferred.promise;
    }

    //Obter um documento pelo atributo _id passado como parâmetro
    //A funcao findOne retorna uma Promise, entao eh soh retorna-la
    public getDocumentById(collectionName: string, id: string): any {
        let idAsObjectID = ObjectID.createFromHexString(id);
        if (this.dbConnection) {
            return this.dbConnection.collection(collectionName).findOne({ _id: idAsObjectID });
        }
    }

    // Recebe o _id do documento como string, transforma em ObjectID e o remove.
    public removeDocumentById(collectionName: string, id: string): any {
        let idAsObjectID = ObjectID.createFromHexString(id);
        if (this.dbConnection) {
            return this.dbConnection.collection(collectionName).removeOne({ _id: idAsObjectID }, { w: 1 });
        }
    }

    // Get the count of all documents in the collection.
    public getDocumentCount(collectionName: string): any {
        let deferred: Q.Deferred<{}> = Q.defer();
        this.dbConnection && this.dbConnection.collection(collectionName).count((err, result) => {
            assert.equal(err, null);
            if (err) {
                deferred.reject(new Error(JSON.stringify(err)));
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }
}