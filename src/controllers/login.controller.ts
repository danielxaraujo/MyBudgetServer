import * as logger from 'logops';
import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config";
import { UserDAO } from "../dao/";


const userDAO: UserDAO = Container.get(UserDAO);

const router: Router = Router();

router.post("/login", (request: Request, response: Response, next: NextFunction) => {

	logger.info("** Login - Resquest body.username: %s", request.body.username);

	let username = request.body.username;
	let password = request.body.password;

    if (!password || !password.trim()) {
        let err = new Error("Password obrigatório!");
        return next(err);
    }

	userDAO.getUserByUserName(username).then(user => {
		const token = sign({ "user": user.username, permissions: [] }, secret, { expiresIn: "7d" });
		response.json({"status": "sucesso", "jwt": token});
	})
});

router.post("/signup", (request: Request, response: Response, next: NextFunction) => {

	logger.info("** Signup - Resquest body.username: %s", request.body.username);
	logger.info("** Signup - Resquest body.password: %s", request.body.password);

	let newUser : { username, password, salt, hash }= {
		username: request.body.username,
		password: request.body.password,
		salt: '',
		hash: ''
	}

    if (!newUser.password || !newUser.password.trim()) {
        let err = new Error("Password obrigatório!");
        return next(err);
    }

	userDAO.getUserByUserName(newUser.username).then(user => {
		if (user) {
			response.status(201).json({status: "erro", message: "Usuário já existente!"});
		} else {
			newUser.salt = randomBytes(128).toString("base64");
			pbkdf2(newUser.password, newUser.salt, 10000, length, digest, (err, hash) => {
				newUser.hash = hash.toString("hex");
				userDAO.insertUser(newUser).then(value => {
					userDAO.getUserById(value.insertedId).then(savedUser => {
						const token = sign({ "user": savedUser.username, permissions: [] }, secret, { expiresIn: "7d" });
						response.status(201).json({status: "sucesso", jwt: token});
					});
				});
			});
		}
    });
});

export const LoginController: Router = router;