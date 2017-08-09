import { ObjectID } from '../dao'

export class STMTTRN {
	constructor(
		public TRNTYPE?: string,
		public DTPOSTED?: string,
		public TRNAMT?: string,
		public FITID?: string,
		public CHECKNUM?: string,
		public REFNUM?: string,
		public MEMO?: string
	) { }
}

export class Transaction {
	constructor(
		public _id?: ObjectID,
		public checkId?: string,
		public flag?: string,
		public date?: Date,
		public payee?: string,
		public category?: number,
		public memo?: string,
		public outflow?: number,
		public inflow?: number,
		public cleared?: boolean,
		public fitid?: string,
		public refnum?: string,
		public account_id?: ObjectID,
		public checked?: boolean,
	) { }
}