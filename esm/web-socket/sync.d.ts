/// <reference types="node" />
import EventEmitter from 'events';
import type { WsClientProps } from './index';
export default class WsClient extends EventEmitter {
    private wsClient;
    private heartbeatTimer;
    private protocols;
    private socketUrl;
    private isAsync?;
    private id;
    constructor(props: WsClientProps);
    send(value: any, isBuffer?: boolean): void;
    private start;
    close(): void;
}
