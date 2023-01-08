export interface Product {
    id: number;
    name: string;
    price: number;
    variety: string;
    receivingDate: number; //precisa formatar como data
    shippingDate: number;
    batch: number;
    weight: number;
}
