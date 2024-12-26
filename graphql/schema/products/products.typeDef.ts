import { gql } from "apollo-server-micro";

export const ProductsTypeDefs = gql`
  type Products {
    key: ID!
    category: CATEGORY!
    name: String!
    content: String!
    price: String!
    stock: Int!
    disabled: Boolean
  }

  input InputProduct {
    category: CATEGORY!
    name: String!
    content: String!
    price: String!
    stock: Int!
    disabled: Boolean
  }

  type Query {
    findAllProducts(offset: Int = 0, limit: Int = 10, search: String): ProductsOut!
  }

  type ProductsOut {
    totalCount: Int!
    products: [Products!]!

  }

  type Mutation {
    createProduct(input: InputProduct!): Products
  }

  enum CATEGORY {
    CERVEZAS
    LICORES
    ENERGIZANTES
    GASEOSAS
    SODAS
    CIGARROS
    PAPAS
    MECATOS
  }
`