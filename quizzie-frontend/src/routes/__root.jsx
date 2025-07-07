// src/routes/__root.jsx
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import useAuthStore from "@/store/authStore";

export const Route = createRootRouteWithContext()({
  component: () => {
    const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
    useEffect(() => {
      hydrateAuth();
    }, [hydrateAuth]);
    return (
      <div className={`min-h-screen`}>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  },
});
