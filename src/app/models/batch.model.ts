import { ProductionMaterial } from "./production-material.model";

export interface Batch {
    id?: number;
    value: string;

    productionMaterial: ProductionMaterial[];
}