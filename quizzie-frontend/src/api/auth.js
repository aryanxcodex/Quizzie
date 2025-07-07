import axios from "axios";
import { BASE_URL } from "@/config/constants";

export const fetchAuthStatus = async () => {
  const response = await axios.get(`${BASE_URL}/auth/check-auth`, {
    withCredentials: true,
  });
  return response.data;
};
