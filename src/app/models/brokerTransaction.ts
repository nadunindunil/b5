export class BrokerTransaction
{
    constructor(
        public type: string,
        public quantity: number,
        public name: string,
        public stock: string,
        public price: number,
        public turn: number
    ){}
}