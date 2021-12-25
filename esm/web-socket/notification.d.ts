/// <reference types="node" />
import EventEmitter from 'events';
import type { WsClientProps, ConnectEvents } from './index';
export default class WsClient extends EventEmitter {
    private wsClient;
    private heartbeatTimer;
    private protocols;
    private socketUrl;
    constructor(props: WsClientProps);
    connect(eventName: string, tag?: any): ConnectEvents;
    private setConnect;
    private start;
}
