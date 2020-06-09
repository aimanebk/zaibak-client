import { Purchase } from './purchase';

export class Product {
    _id : string;
    code: string;
    article: string;
    type: string;
    buyingPrice: number;
    sellingPrice: number;
    discount: [string];
    equivalents: [string];
    notes: string;
    purchaseVariation : [Purchase]
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