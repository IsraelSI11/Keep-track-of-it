import { categoryEnum } from "../enums/categoryEnum";

export type CostType = {
    id?: string;
    category: categoryEnum;
    description?: string | undefined;
    cost: number;
    date: string;
}