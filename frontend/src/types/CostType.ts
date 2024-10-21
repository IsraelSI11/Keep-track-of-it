import { categoryEnum } from "../enums/categoryEnum";

export type CostType = {
    category: categoryEnum;
    description?: string | undefined;
    cost: number;
    date: string;
}