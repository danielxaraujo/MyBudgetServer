import 'core-js/es7/reflect';
import * as logger from 'logops';
import { Router, Request, Response, NextFunction } from "express";
import { Promise } from 'core-js';
import { UserDAO } from "../dao/user.dao";
import { Container } from 'typedi';

const userDAO: UserDAO = Container.get(UserDAO);

const router: Router = Router();

// Controller para gerenciar os usuários
router.get("/all", function(request: Request, response: Response, next: NextFunction) {
    logger.info("## UserRouter - getAllUsers - request: %j", request.body);
    userDAO.getAllUsers().then(users => {
        return response.json({
            "status": "sucesso",
            "users": users
        });
    })
});

export const UserController: Router = router;