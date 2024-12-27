import { gql } from "apollo-server-micro";

export const BoxTypeDefs = gql`
  type Box {
    id: ID!
    user: User!
    client: Client!
  }
`