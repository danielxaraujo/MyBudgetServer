import * as Q from 'q';
import * as assert from 'assert';
import * as logger from 'winston';
import { ObjectID } from 'mongodb';
import { DataAccess } from './abstract.dao';

// Create a class to manage the data manipulation.
export class UserDAO extends DataAccess {

    // Get a new Student based on the user name.
    public getUser(userName: string): any {
        let deferred = Q.defer();
        if (this.dbConnection) {
            let cursor = this.dbConnection.collection('users').find();
            cursor.each((err, document) => {
                assert.equal(err, null);
                if (err) {
                    deferred.reject(new Error(JSON.stringify(err)));
                } else if (document !== null && document['userName'] === userName) {
                    return deferred.resolve(document);
                } else if (document === null) {
                    return deferred.resolve(document);
                }
            });
        }
        return deferred.promise;
    }

    public getUseByPassword(userName: string): any {
        let deferred = Q.defer();
        if (this.dbConnection) {
            let cursor = this.dbConnection.collection('users').find();
            cursor.each((err, document) => {
                assert.equal(err, null);
                if (err) {
                    deferred.reject(new Error(JSON.stringify(err)));
                } else if (document !== null && document['userName'] === userName) {
                    return deferred.resolve(document);
                } else if (document === null) {
                    return deferred.resolve(document);
                }
            });
        }
        return deferred.promise;
    }

    public insertUser(user: any): any {
        return this.insertDocument(user, 'users');
    }

    // Return a promise of an array of users
    public getAllUsers(): any {
        return this.getAllDocuments('users');
    }

    public addConta(idUser: string, idConta: string): any {
        if (this.dbConnection) {
            return this.dbConnection.collection('users').update({ _id: idUser }, { $push: { contas: idConta } });
        }
    }

    public removeConta(idUser: string, idConta: string): any {
        if (this.dbConnection) {
            return this.dbConnection.collection('users').update({ _id: idUser }, { $pull: { contas: { $in: [idConta] } } }, { multi: true });
        }
    }
}