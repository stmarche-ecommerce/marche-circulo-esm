import axios, { AxiosInstance } from "axios";

export class AxiosConfig {
  private static instance: AxiosInstance;

  /**
   * Singleton
   * privado p/ prevenir instanciação direta 
   */
  private constructor() { }

  public static getInstance(): AxiosInstance {
    if (!AxiosConfig.instance) {
      AxiosConfig.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_USERS_V2 ?? '',
        timeout: 7000,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_USERS_V2_API_KEY ?? '',
        },
      })
    }

    return AxiosConfig.instance
  }
}