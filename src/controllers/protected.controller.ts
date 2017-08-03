import * as logger from 'logops';
import { Router, Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

const router: Router = Router();

router.use((request: Request & { headers: { authorization: string }, userName: string }, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;
	verify(token, secret, (err, decodedToken) => {
        if (err) {
			return response.status(403).json({
				status: "erro",
				message: "Token inválido! Faça o login primeiro."
			});
        }
        // Popula o objeto de Request com o userName na própria request, contido no token verificado, para utilização nas chamadas da api.
		logger.info("** DecodedToken.userName: %j", (decodedToken as any).userName);
        request.userName = (decodedToken as any).userName;
		next();
	});
});

router.get("/", (request: Request, response: Response) => {
    response.json({
        status: "sucesso",
        message: "Parabéns, você possui um token válido."
    });
});

export const ProtectedController: Router = router;