export declare function _persist(storage?: Storage): any;
export declare type ApiConfig = {
    host: string;
    /**
     *自定义header用来提交数字重庆的token
     */
    headers?: Record<string, string>;
    /**
     * 是否使用远程服务上的签署能力完成签署，默认false
     */
    remoteService?: boolean;
    /***
     * 当remoteService为true时调起远程服务器上的签署地址
     * 默认为 http://opendev.isigning.cn/sdk/projects/h5/
     */
    remoteServiceUrl?: string;
};
export declare function setConfig(value: ApiConfig): void;
export declare function waterfallReducer(that: any): (p: any, fn: any) => Promise<any>;
declare function get(opts: any): Promise<unknown>;
declare function post(opts: any): Promise<unknown>;
declare function _delete(opts: any): Promise<unknown>;
declare function put(opts: any): Promise<unknown>;
declare function form(opts: any): Promise<unknown>;
declare const Axios: {
    get: typeof get;
    post: typeof post;
    form: typeof form;
    put: typeof put;
    delete: typeof _delete;
};
export default Axios;
export declare function AxiosInstance(props?: ApiConfig): any;
