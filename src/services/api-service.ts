import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosConfig } from "./axios-config";

export class ApiService {
  private request: AxiosInstance

  constructor() {
    this.request = AxiosConfig.getInstance()
  }

  public get(endpoint: string) {
    return this.request.get(endpoint)
  }

  public post(endpoint: string, data: object, config?: AxiosRequestConfig) {
    return this.request.post(endpoint, data, config)
  }

  public put(endpoint: string, data: object) {
    return this.request.put(endpoint, data)
  }

  public patch(endpoint: string, data: object) {
    return this.request.patch(endpoint, data)
  }
}