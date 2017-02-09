import { Promise, Reflect } from 'core-js';
import { DataAccess } from './data.access';
import { Service, Inject } from 'typedi';

// Classe para manipular os dados de usuários
@Service()
export class UserDAO {

    @Inject()
    private _dataAccess: DataAccess;

    // Obter todos os usuários
    public getAllUsers(): Promise<{}> {
        return this._dataAccess.getAllDocuments('users');
    }
}