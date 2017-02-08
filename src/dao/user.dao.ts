import * as Q from 'q';
import * as assert from 'assert';
import * as logger from 'logops';
import { Promise } from 'es6-shim';
import { DataAccess } from './data.access';

// Create a class to manage the data manipulation.
export class UserDAO extends DataAccess {

    // Return a promise of an array of users
    public getAllUsers(): Promise<{}> {
        return this.getAllDocuments('users');
    }
}