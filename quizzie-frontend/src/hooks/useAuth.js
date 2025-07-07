import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/config/constants";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/auth/check-auth`, {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
