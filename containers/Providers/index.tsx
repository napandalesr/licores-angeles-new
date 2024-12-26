
import React from 'react';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

import AuthProvider from './AuthProvider';
import client from '@/graphql/client';

type Props = {
  children?: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <SessionProvider>
    <AuthProvider>
      <ApolloProvider client={client}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </ApolloProvider>
    </AuthProvider>
  </SessionProvider>;
}

export default Providers;