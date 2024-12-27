import prisma from "@/prisma";
import { ClientType } from "@/types/client";

export const ClientResolvers = {
  Query: {
    findAllClients: async (): Promise<ClientType[]> => await prisma.client.findMany({
      include: {
        sale: true
      }
    })
  }
}