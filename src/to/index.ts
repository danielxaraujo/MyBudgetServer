export class STMTTRN {
	constructor(
		public TRNTYPE?: string,
		public DTPOSTED?: Date,
		public TRNAMT?: number,
		public FITID?: string,
		public CHECKNUM?: string,
		public REFNUM?: string,
		public MEMO?: string
	) { }
}