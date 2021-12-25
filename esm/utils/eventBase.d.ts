export default abstract class EventBase<T extends string = any> {
    protected events: Record<string, Function[]>;
    protected emit(eventName: T, ...params: any[]): void;
    removeEventListener(eventName: string, cb: any): void;
    addEventListener(eventName: T, cb: any): void;
}
