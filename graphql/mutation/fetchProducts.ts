import { gql } from "@apollo/client";

export const FETCH_MUTATION_PRODUCTS = gql`
  mutation CreateProduct($input: InputProduct!) {
    createProduct(input: $input) {
      key
      category
      name
      content
      price
      disabled
      stock
    }
  }
`;