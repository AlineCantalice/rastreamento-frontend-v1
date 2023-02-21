export interface Product {
    id?: number;
    name: string;
    price: number;
    variety: string;
    receiptDate: Date;
    shippingDate: Date;
    batch: number;
    weight: number;
}