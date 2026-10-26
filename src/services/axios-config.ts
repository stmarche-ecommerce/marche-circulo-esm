import axios, { AxiosError, AxiosInstance } from "axios";
import axiosRetry from "axios-retry";

const DEFAULT_TIMEOUT = 15000;
const MAX_RETRIES = 3;
// Chamadas passam pelas rotas /api do proprio Next.js; chave e sessao ficam no servidor.
const API_BASE_URL = "/api";

export class AxiosConfig {
  private static instance: AxiosInstance;

  /**
   * Singleton
   * privado p/ prevenir instanciacao direta
   */
  private constructor() { }

  public static getInstance(): AxiosInstance {
    if (!AxiosConfig.instance) {
      AxiosConfig.instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: DEFAULT_TIMEOUT,
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