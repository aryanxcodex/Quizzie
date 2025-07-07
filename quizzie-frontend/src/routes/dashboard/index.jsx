import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "@/config/constants";
export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context }) => {
    try {
      const res = await context.queryClient.fetchQuery({
        queryKey: ["auth"],
        queryFn: async () => {
          const response = await axios.get(`${BASE_URL}/auth/check-auth`, {
            withCredentials: true,
          });
          return response.data;
        },
        staleTime: 5 * 60 * 1000,
      });

      return { user: res };
    } catch (err) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>;
}
