import { gql } from "apollo-server-micro";

export const UserTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
  }

  type Query {
    findAllusers: [User!]!
    findUser(id: ID!): User
    findUserByUsername(username: String!): User
  }

  type Mutation {
    createUser(name: String!, username: String!, password: String!): User
  }
`;
