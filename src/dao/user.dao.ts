import { Promise } from 'es6-shim';
import { DataAccess } from './data.access';

// Classe para manipular os dados de usuários
export class UserDAO extends DataAccess {

    // Obter todos os usuários
    public getAllUsers(): Promise<{}> {
        return this.getAllDocuments('users');
    }
}