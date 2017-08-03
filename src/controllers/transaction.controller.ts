import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { TransactionDAO, ObjectID } from "../dao";

const transactionDAO: TransactionDAO = Container.get(TransactionDAO);
const router: Router = Router();

router.get("/all", (request: Request, response: Response, next: NextFunction) => {
    transactionDAO.getAllTransaction().then(transactions => {
        return response.json(transactions);
    })
});

router.get("/account/:id", (request: Request, response: Response, next: NextFunction) => {
	console.log(request.params);
    transactionDAO.getTransactions({"account_id": new ObjectID(request.params.id)}).then(transactions => {
        return response.json(transactions);
    })
});

router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
	console.log(request.params);
    transactionDAO.getTransactionById(request.params.id).then(transaction => {
        return response.json(transaction);
    })
});

export const TransactionController: Router = router;