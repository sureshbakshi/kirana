import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { app_config } from './../config/app_config';
import _ from '../utils/lodash';
import { api_urls } from './api_urls';

class Server {
    axiosNoInterceptor: AxiosInstance;
    api_urls = api_urls;
    axiosOptions: AxiosRequestConfig = {
        timeout: 60000,
        transformRequest: [this.transformRequest],
        withCredentials: true
    };
    ContentHeaders = {
        Json: 'application/json',
        FormData: 'multipart/form-data',
        Plain: 'text/plain',
       
    };

    BaseDomain = {
        Api: app_config.apiDomain

    };

    constructor() {
        this.axiosNoInterceptor = axios.create();
        axios.interceptors.response.use((response) => {
            if (response.data && response.data.status > 300) {
                this.hideLoader();
            }
            return response;
        }, (error) => {
            this.hideLoader();
            console.log('api service error', error.response);
            if (error.response) {
                if (error.response.status === 401) {
                }
                if (error.response.status === 403) {
                    if (error.response.data) {
                        error.message = error.response.data.message;
                    }
                }

            }
            if (error.message === 'timeout of 10000ms exceeded') {
                error.message = 'Request has been timed out. Please try again';
            }
            if (error.message === 'Network Error') {
                if (navigator.onLine) {
                    error.message = 'We are unable to reach the server. Please try later.';
                } else {
                    error.message = 'Please check your internet connection.';
                }
            }

            return new Promise((resolve, reject) => {
                if (error.response) {
                    console.log('error.response',error.response);
                    reject(error.response.data);
                } else {
                    console.log('error',error);
                    reject(error);
                }
            });
        });

        this.axiosNoInterceptor.interceptors.response.use((response) => {
            this.hideLoader();
            if (response.data.status === 401) {
                console.log('401',response.data);
            }
            return response;
        }, (error) => {
            this.hideLoader();
            if (error.response.status === 400) {
                return new Promise((resolve, reject) => {
                    if (error.response) {
                        reject(error.response.data);
                    } else {
                        reject(error);
                    }
                });
            }

            if (error.response) {
                if ((error.response.status === 401)) {
                    console.log('401-error',error.response);
                }
                if (error.response.status === 403) {
                    console.log('403-error',error.response);
                    if (error.response.data) {
                        error.message = error.response.data.message;
                    }
                }
            }
            if (error.message === 'timeout of 10000ms exceeded') {
                error.message = 'Request has been timed out. Please try again';
            }
            if (error.message === 'Network Error') {
                if (navigator.onLine) {
                    error.message = 'We are unable to reach the server. Please try later.';
                } else {
                    error.message = 'Please check your internet connection.';
                }
            }

            return new Promise((resolve, reject) => {
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject(error);
                }
            });
        });

    }
    sessionExpired = false;
    
    hideLoader() {
        
    }
    transformRequest(data: any) {
        if (data && data.headerType === api_service.ContentHeaders.Json) {
            try {
                data = JSON.parse(data);
                let temp = _.clone(data);
                _.map(data, (value, key) => {
                    if (key && key.indexOf('__') > -1) {
                        delete temp[key];
                    }
                });
                return JSON.stringify(temp);
            } catch (e) {
                return data;
            }
        } else {
            return data;
        }
    }

    getHeadersByType(headerType, domain: string, customHeaders?: any): any {
        let data = {};
        switch (headerType) {
            case api_service.ContentHeaders.Json: {
                data['Content-Type'] = 'application/json';
                break;
            }
            case api_service.ContentHeaders.Plain: {
                data['Content-Type'] = 'text/plain';
                break;
            }
            case api_service.ContentHeaders.FormData: {
                data['Content-Type'] = 'multipart/form-data';
                break;
            }
            default:
                data['Content-Type'] = 'application/json';
                break;
        }
        // console.log('localStorage', localStorage.getItem('key'))
        // data["crossDomain"]= true
        data = _.extend({}, data, customHeaders);
        return data;
    }

    post = (data: {
        endPoint: string;
        payLoad?: any;
        domain?: string;
        headerType?: string;
        customHeaders?: any;
        showLoader?: boolean;
        useNonInterceptor?: boolean;
    }) => {
        if (!data.domain) {
            data.domain = api_service.BaseDomain.Api;
        }
        if (!data.headerType) {
            data.headerType = api_service.ContentHeaders.Json;
        }

        if (data.headerType === api_service.ContentHeaders.Json) {
            data.payLoad = JSON.stringify(data.payLoad);
        }
        if (!navigator.onLine) {

        }

        if (!data.useNonInterceptor) {
            data.useNonInterceptor = false;
        }

        if (data.useNonInterceptor) {
            return this.axiosNoInterceptor.post(data.endPoint,
                data.payLoad, {
                    timeout: this.axiosOptions.timeout,
                    transformRequest: this.axiosOptions.transformRequest,
                    baseURL: data.domain,
                    headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders)
                });

        } else {
            return axios.post(data.endPoint,
                data.payLoad, {
                    timeout: this.axiosOptions.timeout,
                    transformRequest: this.axiosOptions.transformRequest,
                    baseURL: data.domain,
                    headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders)
                });

        }
    }

    isNetworkError = (error) => {
        return !error.response && error.code !== 'ECONNABORTED';
    }

    retry = (config: AxiosRequestConfig) => {
        return axios(config);
    }
    put = (data: {
        endPoint: string;
        payLoad?: any;
        domain?: string;
        id?: string;
        headerType?: string;
        customHeaders?: any;
        showLoader?: boolean;
    }) => {

        if (!data.domain) {
            data.domain = api_service.BaseDomain.Api;
        }
        if (!data.headerType) {
            data.headerType = api_service.ContentHeaders.Json;
        }
        if (data.headerType !== api_service.ContentHeaders.Json) {
            data.payLoad = JSON.stringify(data.payLoad);
        }
        return axios.put(data.endPoint,
            data.payLoad, {
                timeout: this.axiosOptions.timeout,
                transformRequest: this.axiosOptions.transformRequest,
                baseURL: data.domain,
                headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders)
            });
    }

    delete = (data: {
        endPoint: string;
        payLoad?: any;
        domain?: string;
        id?: string;
        headerType?: string;
        customHeaders?: any;
        showLoader?: boolean
    }) => {

        if (!data.domain) {
            data.domain = api_service.BaseDomain.Api;
        }
        if (!data.headerType) {
            data.headerType = api_service.ContentHeaders.Json;
        }

        if (data.showLoader !== false) {
            data.showLoader = true;
        }
        return axios.delete(data.endPoint, {
            baseURL: data.domain,
            headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders)
        });
    }

    get = (data: {
        endPoint: string;
        payLoad?: any;
        domain?: string;
        id?: string;
        headerType?: string;
        customHeaders?: any;
        showLoader?: boolean;
    }) => {
        if (!data.domain) {
            data.domain = api_service.BaseDomain.Api;
        }
        if (!data.headerType) {
            data.headerType = api_service.ContentHeaders.Json;
        }

        return axios.get(data.endPoint, {
            baseURL: data.domain,
            timeout: this.axiosOptions.timeout,
            params: data.payLoad,
            headers: this.getHeadersByType(data.headerType, data.domain, data.customHeaders)
        });
    }

}
export const api_service = new Server();
