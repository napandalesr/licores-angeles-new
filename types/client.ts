import { SaleTypes } from "./sale";

export type ClientType = {
  id: number;
  name: string;
  sale: SaleTypes[];
  createdAt: Date;
}