import * as logger from 'logops';
import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config";
import { Cursor } from 'mongodb';
import { UserDAO } from "../dao/";
import { Container } from 'typedi';

const userDAO: UserDAO = Container.get(UserDAO);

const router: Router = Router();

router.post("/login", function (request: Request, response: Response, next: NextFunction) {
	logger.info("** Login - Resquest body.userName: %s", request.body.userName);
	userDAO.getUser(request.body.userName).toArray().then(users => {
		let user: { name } = users[0];
		const token = sign({ "name": user.name, permissions: [] }, secret, { expiresIn: "7d" });
		response.json({
			"status": "sucesso",
			"jwt": token
		});
	})
});

export const LoginController: Router = router;