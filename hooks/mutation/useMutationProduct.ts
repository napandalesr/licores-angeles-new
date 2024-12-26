import { useMutation } from "@apollo/client";

import { FETCH_MUTATION_PRODUCTS } from "@/graphql/mutation/fetchProducts";
import { ProductsType } from "@/types/products";

export const  useMutationProduct = () => {
  const [createProduct, {loading}] = useMutation(FETCH_MUTATION_PRODUCTS);

  const handlerCreateProduct = async (product: ProductsType) => {
    return await createProduct({
      variables: {
        input: product
      }
    })
  };

  return { handlerCreateProduct, loading };
}