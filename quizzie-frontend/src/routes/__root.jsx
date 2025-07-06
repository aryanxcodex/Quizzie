// src/routes/__root.jsx
import {
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAppStore } from '../store/appStore.js';

export const Route = createRootRouteWithContext()({
  component: () => {
    const theme = useAppStore((s) => s.theme);

    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
        <Outlet /> {/* Pages will define their own layout */}
        <TanStackRouterDevtools />
      </div>
    );
  },
});
