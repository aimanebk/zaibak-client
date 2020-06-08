export class Product {
    _id : string;
    code: string;
    article: string;
    type: string;
    buyingPrice: number;
    sellingPrice: number;
    stockI: {
        _id : string;
        productCode : string;
        date : Date;
        stock : number
    };
    stockF: {
        _id : string;
        productCode : string;
        date : Date;
        stock : number
    };
    out : number
}