import { productsResolvers, ProductsTypeDefs } from "./products";
import { userResolvers, UserTypeDefs } from "./user";

import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

export const typeDefs = mergeTypeDefs([UserTypeDefs, ProductsTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, productsResolvers]);