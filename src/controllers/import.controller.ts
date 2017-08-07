import * as multer from 'multer'
import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { ImportOfxDao } from "../dao";
import { Banking } from 'banking';

const importOfxDao: ImportOfxDao = Container.get(ImportOfxDao);
const router: Router = Router();

router.post("/ofx", multer().any(), (request: any, response: Response, next: NextFunction) => {

	console.log(request.file);

	Banking.parse(request.file, data => {
		console.log(data);
		return response.sendStatus(200);
	});
});

export const ImportController: Router = router;