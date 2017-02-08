import * as logger from 'logops';
import { Router, Request, Response, NextFunction } from "express";
import { UserDAO } from "../dao/user.dao";

let userDAO = new UserDAO();

const router: Router = Router();

router.get("/all", function(request: Request, response: Response, next: NextFunction) {
    logger.info("**UserRouter - getAllUsers - request: %j", request.body);
    userDAO.getAllUsers().then(users => {
        return response.json({
            "status": "sucesso",
            "users": users
        });
    }).catch((e) => {
        logger.info("** Error = %j", e);
        return response.json({
            "status": "erro",
            "message": "Erro ao autenticar usuário!"
        });
    });
});

export const UserController: Router = router;