import { Purchase } from './purchase';

export class Product {
    _id? : string;
    code: string;
    article: string;
    brand: string;
    type: string;
    buyingPrice?: number;
    sellingPrice?: number;
    discount: [number];
    specialDiscount : number;
    equivalents: [string];
    notes: string;
    purchaseVariation? : [Purchase];
    stock : number;
    stockI?: {
        _id : string;
        productCode : string;
        date : Date;
        stock : number
    };
    stockF?: {
        _id : string;
        productCode : string;
        date : Date;
        stock : number
    };
    out? : number;
    startValue? : number;
    endValue? : number;
}