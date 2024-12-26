import { gql } from "@apollo/client";

export const FETCH_QUERY_PRODUCTS = gql`
  query FindAllProducts($search: String, $limit: Int, $offset: Int) {
    findAllProducts(search: $search, limit: $limit, offset: $offset) {
      totalCount
      products {
        key
        category
        name
        content
        price
        stock
        disabled
      }
    }
  }
`;

