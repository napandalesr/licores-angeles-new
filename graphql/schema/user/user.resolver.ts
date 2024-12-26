import { UserInputError } from "apollo-server-micro";
import bcrypt from 'bcrypt';

import prisma from "@/prisma";

type User = {
  name: string;
  id: string;
  username: string;
  password: string;
}

export const userResolvers = {
  Query: {
    findAllusers: async (): Promise<User[]> => await prisma.user.findMany(),
    findUser: async (_parent: unknown, args: { id: string }): Promise<User | null> => await findUser(args.id),
    findUserByUsername: async (_parent: unknown, args: { username: string }): Promise<User | null> => await findUserByUsername(args.username),
  },
  Mutation: {
    createUser: async(_: unknown, args: User): Promise<{id: string, name: string, username: string}> => {
      const { name, username, password } = args;
      const userExist = await findUserByUsername(username);
      if(userExist) {
        throw new UserInputError('El usuario ya se encuentra registrado', {
          code: 400,
          status: 400,
        })
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword", hashedPassword, password);
      
      const response = await prisma.user.create({
        data: {
          name,
          username,
          password: hashedPassword
        }
      });
      return { id: response.id, name, username };
    }
  }
};

const findUser = async (id: string): Promise<User | null> =>
  await prisma.user.findFirst({
    where: {
      id: id
    }
  });

const findUserByUsername = async (username: string): Promise<User | null> =>
  await prisma.user.findFirst({
    where: {
      username
    }
  });
