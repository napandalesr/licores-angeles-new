import React from 'react';
import { useSession } from 'next-auth/react';

import Loading from '@/components/Loading';

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { status } = useSession();
  
  

  if (status == "loading") {
    console.log("status", status);
    //return <Loading text="Cargando..." type="spinningBubbles"/>
  }
  
  return children;
}

export default AuthProvider;