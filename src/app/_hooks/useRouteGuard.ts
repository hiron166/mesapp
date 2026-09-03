import { useSupabaseSession } from "./useSupabaseSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRouteGuard = () => {
  const router = useRouter();
  const { session, isLoading } = useSupabaseSession();

  useEffect(() => {
    if (isLoading) return;
    const fetcher = async () => {
      if (session === null) {
        router.replace("/login");
      }
    };
    fetcher();
  }, [router, session, isLoading]);

  //認可してない時に一瞬も描画されないようにするもの
  return { session, isLoading };
};
