// src/routes/__root.jsx
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext()({
  component: () => {
    return (
      <div className={`min-h-screen`}>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  },
});
