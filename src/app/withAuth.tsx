import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBluesky } from "../services/useBluesky";

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T & JSX.IntrinsicAttributes) {
    const router = useRouter();
    const agent = useBluesky();

    useEffect(() => {
      if (!agent) {
        router.push("/login");
      }
    }, [agent, router]);

    if (!agent) {
      return null;
    }

    return <Component {...props} />;
  };
}
