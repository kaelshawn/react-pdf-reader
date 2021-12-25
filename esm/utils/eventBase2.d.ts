/// <reference types="node" />
import EventEmitter from 'events';
export declare type P = {
    [key in string | symbol]: unknown;
};
export default abstract class EventBase<T extends P> extends EventEmitter {
    removeListener<K extends keyof T>(eventName: K, cb: (args: T[K]) => void): this;
    addListener<K extends keyof T>(eventName: K, cb: (args: T[K]) => void): this;
    emit<K extends keyof T>(eventName: K, args?: T[K]): boolean;
    once<K extends keyof T>(eventName: K, cb: (args: T[K]) => void): this;
    on<K extends keyof T>(eventName: K, cb: (args: T[K]) => void): this;
}
