import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { TransactionDAO } from "../dao";

const transactionDAO: TransactionDAO = Container.get(TransactionDAO);
const router: Router = Router();

router.get("/all", (request: Request, response: Response, next: NextFunction) => {
    transactionDAO.getAllTransaction().then(transactions => {
        return response.json({
            "status": "sucesso",
            "data": transactions
        });
    })
});

export const TransactionController: Router = router;