import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { AccountDAO } from "../dao";

const accountDAO: AccountDAO = Container.get(AccountDAO);
const router: Router = Router();

router.get("/all", (request: Request, response: Response, next: NextFunction) => {
    accountDAO.getAllAccount().then(accounts => {
        return response.json(accounts);
    })
});

export const AccountController: Router = router;