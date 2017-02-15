import * as logger from 'logops';
import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { UserDAO } from "../dao";

const userDAO: UserDAO = Container.get(UserDAO);

const router: Router = Router();

// Controller para gerenciar os usuários
router.post("/id", (request: Request, response: Response, next: NextFunction) => {
    logger.info("## UserRouter - users/id - request: %j", request.body.userId);
    userDAO.getUserById(request.body.userId).then(user => {
        return response.json({
            "status": "sucesso",
            "users": user
        });
    })
});

// Controller para gerenciar os usuários
router.get("/all", (request: Request, response: Response, next: NextFunction) => {
    logger.info("## UserRouter - getAllUsers - request: %j", request.body);
    userDAO.getAllUsers().then(users => {
        return response.json({
            "status": "sucesso",
            "users": users
        });
    })
});

export const UserController: Router = router;