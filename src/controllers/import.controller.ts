import * as moment from 'moment';
import { parse as parseOFX } from 'ofx-js';
import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from "express";
import { ImportOfxDao, ObjectID } from "../dao";
import { STMTTRN, Transaction } from "../to";

const importOfxDao: ImportOfxDao = Container.get(ImportOfxDao);
const router: Router = Router();

router.post("/ofx", (request: any, response: Response, next: NextFunction) => {

	let buffer: Buffer = request.file.buffer;

	parseOFX(buffer.toString('ascii')).then(ofxFile => {
		let statementResponse = ofxFile.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS;
		//let currencyCode = statementResponse.CURDEF;
		//let bankId = statementResponse.BANKACCTFROM.BANKID;
		//let branchId = statementResponse.BANKACCTFROM.BRANCHID;
		//let accountId = statementResponse.BANKACCTFROM.ACCTID;
		//let acctType = statementResponse.BANKACCTFROM.ACCTTYPE;
		let transactionStatement = statementResponse.BANKTRANLIST.STMTTRN;
		for (let i = 0; i < transactionStatement.length; i++) {
			let stmttrn: STMTTRN = <STMTTRN>transactionStatement[i]
			let transaction: Transaction = {};
			transaction.flag = null;
			transaction.date = moment(stmttrn.DTPOSTED.substr(0, 8), 'YYYYMMDD').toDate();
			transaction.checkId = stmttrn.CHECKNUM;
			transaction.payee = null;
			transaction.category = null;
			transaction.memo = stmttrn.MEMO;
			let value: number = Number.parseFloat(stmttrn.TRNAMT);
			transaction.inflow = value > 0 ? value : null;
			transaction.outflow = value < 0 ? value : null;
			transaction.fitid = stmttrn.FITID;
			transaction.checked = false;
			transaction.account_id = new ObjectID('58ab4c1623ad9f4999c0b59a');
			importOfxDao.importTransaction(transaction);
		}
		return response.sendStatus(200);
	});
});

export const ImportController: Router = router;