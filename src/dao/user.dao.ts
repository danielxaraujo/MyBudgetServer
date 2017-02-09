import { Promise, Reflect } from 'core-js';
import { Cursor } from 'mongodb';
import { DataAccess } from './data.access';
import { Service, Inject } from 'typedi';

// Classe para manipular os dados de usuários
@Service()
export class UserDAO {

    @Inject()
    private _dataAccess: DataAccess;

    // Obter todos os usuários
    public getAllUsers(): Cursor {
        return this._dataAccess.findAll('users');
    }

    // Obter todos os usuários
    public getUser(userName: string): Cursor {
        return this._dataAccess.find('users', {name: userName});
    }
}