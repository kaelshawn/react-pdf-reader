export declare type wsClientConfig = {
    async?: number;
    tag?: number;
    id?: string | number;
    module: string;
    isMaster?: number;
    width?: number;
    height?: number;
};
export declare type WsClientProps = {
    id?: any;
    url?: string;
    protocols?: string;
    module?: string;
    tag?: any;
    isAsync?: boolean;
    isMaster?: boolean;
    width?: number;
    height?: number;
};
export declare type ConnectEvents = {
    send: (e: any) => ConnectEvents;
    clear: () => ConnectEvents;
};
