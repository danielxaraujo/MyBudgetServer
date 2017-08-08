//import * as multer from 'multer'
import { parse as parseOFX } from 'ofx-js';
import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { ImportOfxDao } from "../dao";
import { STMTTRN } from "../to";

const importOfxDao: ImportOfxDao = Container.get(ImportOfxDao);
const router: Router = Router();

router.post("/ofx", (request: any, response: Response, next: NextFunction) => {

	let buffer: string = request.file.buffer.toString();

	parseOFX(buffer).then(ofxFile => {
		let statementResponse = ofxFile.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS;
		let currencyCode = statementResponse.CURDEF;
		let bankId = statementResponse.BANKACCTFROM.BANKID;
		let branchId = statementResponse.BANKACCTFROM.BRANCHID;
		let accountId = statementResponse.BANKACCTFROM.ACCTID;
		let acctType = statementResponse.BANKACCTFROM.ACCTTYPE;
		let transactionStatement = statementResponse.BANKTRANLIST.STMTTRN;
		for (let i = 0; i < 1; i++) {
			let stmttrn: STMTTRN = <STMTTRN>transactionStatement[i]
			console.log(stmttrn.TRNTYPE);
			console.log(stmttrn.DTPOSTED);
			console.log(stmttrn.TRNAMT);
			console.log(stmttrn.FITID);
			console.log(stmttrn.CHECKNUM);
			console.log(stmttrn.REFNUM);
			console.log(stmttrn.MEMO);
			console.log('');
		}
		return response.sendStatus(200);
	});
});

export const ImportController: Router = router;