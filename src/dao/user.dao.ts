import { Promise } from 'core-js';
import { ObjectID, InsertOneWriteOpResult } from 'mongodb';
import { DataAccess } from './data.access';
import { Service, Inject } from 'typedi';

// Classe para manipular os dados de usuários
@Service()
export class UserDAO {

    @Inject()
    private _dataAccess: DataAccess;

    // Obter todos os usuários
    public getAllUsers() : Promise<any[]> {
        return this._dataAccess.getAllDocuments('users');
    }

    // Obter usuários pelo critério de consulta
    public getUser(query: {}) : Promise<any[]> {
        return this._dataAccess.getDocuments('users', query);
    }

    // Obter usuario por id
    public getUserByUserName(userName: string) : Promise<any> {
        return this._dataAccess.getOneDocument('users', {username: userName});
    }

    // Obter usuario por id
    public getUserById(id: string | ObjectID ) : Promise<any> {
        return this._dataAccess.getDocumentById('users', id);
    }

    // Inserir um usuário
    public insertUser(user: {}) : Promise<InsertOneWriteOpResult> {
        return this._dataAccess.insertDocument('users', user);
    }
}