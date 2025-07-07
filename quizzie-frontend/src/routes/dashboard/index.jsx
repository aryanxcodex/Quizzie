import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import useAuthStore from "../../store/authStore.js";
export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      toast.error("You must be logged in to view that page.");
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>;
}
