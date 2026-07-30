import axios, { AxiosError, AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import { readStoredAuthSession } from "@/lib/auth-session";

const DEFAULT_TIMEOUT = 15000;
const MAX_RETRIES = 3;
const USERS_API_BASE_URL = process.env.NEXT_PUBLIC_API_USERS_V2?.trim() ?? "";
const USERS_API_KEY = process.env.NEXT_PUBLIC_USERS_V2_API_KEY?.trim() ?? "";

export class AxiosConfig {
  private static instance: AxiosInstance;

  /**
   * Singleton
   * privado p/ prevenir instanciacao direta
   */
  private constructor() { }

  public static getInstance(): AxiosInstance {
    if (!AxiosConfig.instance) {
      if (!USERS_API_BASE_URL) {
        console.warn("[AxiosConfig] Variavel NEXT_PUBLIC_API_USERS_V2 ausente no bundle do cliente.");
      }

      if (!USERS_API_KEY) {
        console.warn("[AxiosConfig] Variavel NEXT_PUBLIC_USERS_V2_API_KEY ausente no bundle do cliente.");
      }

      AxiosConfig.instance = axios.create({
        baseURL: USERS_API_BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
          "x-api-key": USERS_API_KEY,
        },
      });

      axiosRetry(AxiosConfig.instance, {
        retries: MAX_RETRIES,
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error),
        onRetry: (retryCount, error, requestConfig) => {
          console.warn(
            `[AxiosConfig] Retry ${retryCount}/${MAX_RETRIES} em ${requestConfig.url} - motivo: ${error.code ?? error.message}`,
          );
        },
      });

      AxiosConfig.instance.interceptors.request.use((config) => {
        const session = readStoredAuthSession();
        if (session?.token) {
          config.headers.Authorization = `Bearer ${session.token}`;
        }

        return config;
      });

      AxiosConfig.instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          if (error.code === "ECONNABORTED") {
            console.error(
              `[AxiosConfig] Timeout em ${error.config?.url} (limite: ${error.config?.timeout}ms)`,
            );
          } else if (!error.response) {
            console.error(
              `[AxiosConfig] Erro de rede em ${error.config?.url}: ${error.message}`,
            );
          } else {
            console.error(
              `[AxiosConfig] Erro ${error.response.status} em ${error.config?.url}`,
            );
          }
          return Promise.reject(error);
        },
      );
    }

    return AxiosConfig.instance;
  }
}