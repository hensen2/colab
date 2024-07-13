import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { InternalAxiosRequestConfig } from "axios";

export default function useAxiosApi() {
  const queryClient = useQueryClient();

  const accessToken: string | undefined = queryClient.getQueryData(["auth"]);

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers.common = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      };

      return config;
    },
    function (err) {
      console.log(err);
      return Promise.reject(err);
    },
  );
}
