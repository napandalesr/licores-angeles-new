import { BoxTypeDefs } from "./box";
import { ClientResolvers, ClientTypeDefs } from "./client";
import { productsResolvers, ProductsTypeDefs } from "./products";
import { SaleTypeDefs } from "./Sale";
import { userResolvers, UserTypeDefs } from "./user";

import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

export const typeDefs = mergeTypeDefs([UserTypeDefs, ProductsTypeDefs, BoxTypeDefs, ClientTypeDefs, SaleTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, productsResolvers, ClientResolvers]);