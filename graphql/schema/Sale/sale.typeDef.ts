import { gql } from "apollo-server-micro";

export const SaleTypeDefs = gql`
  type Sale {
    id: ID!
    name: String!
    count: Int!
    descount: Int
  }
`