import { useSyncExternalStore, type ReactNode } from "react";

const emptySubscribe = () => () => {};

/** true only after hydration on the client — SSR-stable */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/** renders children on the client only; SSR renders the fallback */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return useIsClient() ? <>{children}</> : <>{fallback}</>;
}
