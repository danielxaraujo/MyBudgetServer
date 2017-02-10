import * as logger from 'logops';
import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config";
import { UserDAO } from "../dao/";
import { Container } from 'typedi';

const userDAO: UserDAO = Container.get(UserDAO);

const router: Router = Router();

router.post("/login", (request: Request, response: Response, next: NextFunction) => {

	logger.info("** Login - Resquest body.username: %s", request.body.username);

	let userName = request.body.username;
	let password = request.body.password;

    if (!password || !password.trim()) {
        let err = new Error("Password obrigatório!");
        return next(err);
    }

	userDAO.getUserByUserName(request.body.username).then(user => {
		const token = sign({ "user": user.username, permissions: [] }, secret, { expiresIn: "7d" });
		response.json({
			"status": "sucesso",
			"jwt": token
		});
	})
});

router.post("/signup", (request: Request, response: Response, next: NextFunction) => {

	let user : { username, password, salt, hash }= {
		username: request.body.username,
		password: request.body.password,
		salt: null,
		hash: null
	}

    if (!user.password || !user.password.trim()) {
        let err = new Error("Password obrigatório!");
        return next(err);
    }

	userDAO.getUserByUserName(user.username).then(user => {
		if (user) {
			response.json({
                status: "erro",
                message: "Usuário já existente!"
            });
			response.sendStatus(201);
		} else {
			user.salt = randomBytes(128).toString("base64");
			pbkdf2(user.password, user.salt, 10000, length, digest, (err, hash) => {
				user.hash = hash.toString("hex");
				userDAO.insertUser(user).then(value => {
					userDAO.getUserById(value.insertedId).then(savedUser => {
						const token = sign({ "user": savedUser.username, permissions: [] }, secret, { expiresIn: "7d" });
						response.json({
							status: "sucesso",
							jwt: token
						});
						response.sendStatus(201);
					});
				});
			});
		}
    });
});

export const LoginController: Router = router;