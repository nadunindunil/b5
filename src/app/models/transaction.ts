export class Transaction
{
    constructor(
        public type: string,
        public amount: string,
        public accountNumber: string,
        public description: string
    ){}
}