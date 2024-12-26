import { useRouter } from 'next/router';

import NavBar from "@/components/Header";
import Loading from "@/components/Loading";
import FormSearch from "@/containers/Sales/FormSearch";
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { status } = useAuth();
  const router = useRouter();

  if(status == "unauthenticated") {
    router.push("/auth");
    return <Loading text="Redirigiendo..." type="bars"/>
  }
  return (
    <>
      <NavBar location="/"/>
      <main className="mt-20 p-20">
        <FormSearch/>
      </main>
    </>
  );
}
