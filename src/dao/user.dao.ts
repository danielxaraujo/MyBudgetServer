import { Promise } from 'core-js';
import { DataAccess } from './data.access';
import { Service, Inject } from 'typedi';

// Classe para manipular os dados de usuários
@Service()
export class UserDAO {

    @Inject()
    private _dataAccess: DataAccess;

    // Obter todos os usuários
    public getAllUsers() : Promise<any[]> {
        return this._dataAccess.findAllDocuments('users');
    }

    // Obter todos os usuários
    public getUser(userName: string) : Promise<any[]> {
        return this._dataAccess.findDocument('users', {name: userName});
    }
}