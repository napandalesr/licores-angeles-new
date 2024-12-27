import { UserInputError } from "apollo-server-micro";

import prisma from "@/prisma";
import { ProductsType } from "@/types/products";

type InputProduct = {
  input: ProductsType
}

type OutProduct = {
  totalCount: number,
  products: ProductsType[]
}

export const productsResolvers = {
  Query: {
    findAllProducts: async (_: unknown, { offset = 0, limit = 10, search = "" }): Promise<OutProduct> => {
      /*await prisma.client.create({
        data: {
          name: "Mesa 2",
        }
      })*/
      const client = await prisma.client.findMany({
        include: {
          sale: true
        }
      })
      console.log("client", client);
      
      const totalCount = await prisma.product.count({
        where: {
          name: {
            contains: search, // Filtro por búsqueda
          },
        },
      });

      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: search,
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          key: "asc",
        },
      });

      return {
        totalCount,
        products
      }
    }
  },
  Mutation: {
    createProduct: async(_: unknown, args: InputProduct): Promise <ProductsType> => {
      const productExist = await findProductByName(args.input.name);
      if(productExist) {
        throw new UserInputError("Este producto ya se encuentra registrado", {
          code: 400,
          status: 400
        });
      }

      return await prisma.product.create({
        data: {
          ...args.input
        }
      })
    }
  }
}

const findProductByName = async (name: string): Promise<ProductsType | null> =>
  await prisma.product.findFirst({
    where: {
      name
    }
  });