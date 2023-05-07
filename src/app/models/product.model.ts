import { Batch } from "./batch.model";

export interface Product {
    id?: number;
    name: string;
    price: number;
    variety: string;
    receiptDate: Date;
    shippingDate: Date;
    batch: Batch;
    weight: number;
}