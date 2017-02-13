import * as logger from 'logops';
import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { genSalt, hash, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config";
import { UserDAO } from "../dao/";

const userDAO: UserDAO = Container.get(UserDAO);
const router: Router = Router();

router.post("/login", (request: Request, response: Response, next: NextFunction) => {

	let username = request.body.username;
	let password = request.body.password;

    if (!password || !password.trim()) {
        let err = new Error("Password obrigatório!");
        return next(err);
    }

	userDAO.getUserByUserName(username).then(user => {
		if (compareSync(password, user.password)) {
			const token = sign({ "username": user.username }, secret, { expiresIn: "7d" });
			response.status(201).json({status: "sucesso", jwt: token});
		} else {
			response.status(401).json({status: "Não autorizado"});
		}
	}).catch(err => {
		response.status(401).json({status: "Não autorizado"});
	})
});

router.post("/signup", (request: Request, response: Response, next: NextFunction) => {

	logger.info("** Signup - Resquest body.username: %s", request.body.username);
	logger.info("** Signup - Resquest body.password: %s", request.body.password);

	let newUser : { username, password, salt }= {
		username: request.body.username,
		password: request.body.password,
		salt: ''
	}

    if (!newUser.password || !newUser.password.trim()) {
        let err = new Error("Password obrigatório!");
        return next(err);
    }

	userDAO.getUserByUserName(newUser.username).then(user => {
		if (user) {
			response.status(201).json({status: "erro", message: "Usuário já existente!"});
		} else {
			genSalt(10, (err, salt) => {
				newUser.salt = salt;
				hash(newUser.password, salt, (err, hash) => {
					newUser.password = hash;
					userDAO.insertUser(newUser).then(value => {
						userDAO.getUserById(value.insertedId).then(savedUser => {
							const token = sign({ "username": savedUser.username }, secret, { expiresIn: "7d" });
							response.status(201).json({status: "sucesso", jwt: token});
						}).catch(err => {
							logger.info(err);
						});
					}).catch(err => {
						logger.info(err);
					});
				});
			});
		}
    });
});

export const LoginController: Router = router;