import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/prisma';

export default NextAuth({
  debug: true,
  providers: [
    Credentials({
      name: "crendentials",
      credentials: {
        username: { label: 'username', type: 'username' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { username: credentials?.username },
        });

        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return { id: user.id, name: user.name, username: user.username };
        }

        throw new Error("Login failed");;
      },
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = { name: token.name, email: token.email };
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    error: '/auth',
    signIn: '/'
  }
});
