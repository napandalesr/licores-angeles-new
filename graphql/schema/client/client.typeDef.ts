import { gql } from "apollo-server-micro";

export const ClientTypeDefs = gql`
  type Client {
    id: ID!
    name: String!
    sale: [Sale]!
    box: [Box]!
  }

  type Query {
    findAllClients: [Client!]!
  }
`