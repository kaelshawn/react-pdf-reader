export declare type AsyncHelperOptions = {
    isThrow?: boolean;
    isLoading?: boolean;
    loadingMessage?: string;
};
export declare const run: <T extends (...args: any) => any>(handler: T, options?: AsyncHelperOptions) => Promise<false | ReturnType<T>>;
