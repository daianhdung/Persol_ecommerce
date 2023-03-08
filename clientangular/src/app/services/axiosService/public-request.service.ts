import { ErrorHandler, Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

export interface Params{
  [key: string]: any;
}

export interface GetOptions{
  url: string;
  param? : Params;
}

export interface ErrorResponse {
	id: string;
	code: string;
	message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicRequestService {
  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) { 
    this.errorHandler = errorHandler;
 
		// The ApiClient wraps calls to the underlying Axios client.
		this.axiosClient = axios.create({
			timeout: 3000,
			headers: {
				"X-Initialized-At": Date.now().toString()
			}
		});
  }

  public async get<T>(options: GetOptions): Promise<T>{
    try{
      var axiosResponse = await this.axiosClient.request<T>({
        method: "get",
        url: options.url,
        params: options.param
      })
      return axiosResponse.data;
    }catch(error){
      console.log(error);
      return Promise.reject(this.normalizeError(error));
    }
  }

  private normalizeError(error: any) : ErrorResponse{
    this.errorHandler.handleError(error);
    return ({
      id: "-1",
      code: "UnknownError",
			message: "An unexpected error occurred."
    })
  }
}
