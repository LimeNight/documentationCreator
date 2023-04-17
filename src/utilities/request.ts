import type {AxiosRequestConfig,AxiosResponse } from 'axios'

const request = <T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> => {
    return request(config);
}

export default request