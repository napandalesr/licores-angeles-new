import { useQuery } from "@apollo/client";

import { FETCH_QUERY_PRODUCTS } from "@/graphql/queries/fetchProducts";

export const useQueryProduct = (search = "", limit = 0, offset = 10) => {
  const { data, loading, error } = useQuery(FETCH_QUERY_PRODUCTS, {
    variables: { offset, limit, search },
  });

  return {
    products: data?.findAllProducts.products || [],
    totalCount: data?.findAllProducts.totalCount || 0,
    loading,
    error
  };
};
