/// <reference types="node" />
import { Transform, Writable } from 'stream';
import SignToolsBar from '../signToolBar/main';
import type { SignBoardProps } from './interface';
import { SignValueDetails } from './types';
export default class SignBoard {
    signView: HTMLElement;
    protected toolsBar?: SignToolsBar;
    protected options: SignBoardProps;
    points: any[];
    /**
     * 屏幕是否旋转
     */
    protected isRotate: boolean;
    protected container: HTMLElement;
    protected canvas: HTMLCanvasElement;
    protected listener: HTMLElement;
    protected bgView: HTMLElement;
    protected signMask?: HTMLElement;
    private events;
    private murmurInfo;
    private timeoutId;
    fakePressure: boolean;
    protected maxPressure: number;
    get thickness(): number;
    get isPortrait(): boolean;
    set color(color: string);
    get color(): string;
    protected ds: Transform | Writable;
    protected ps: Transform;
    protected ts: Transform;
    protected bs: any;
    private orientationChange;
    init(options: SignBoardProps): this;
    protected changeCanvas(): void;
    updateSize(): void;
    protected updateCanvasSize(): void;
    protected createCanvas(): void;
    getCanvase(): HTMLCanvasElement;
    createBgView(bgContent: any): void;
    changeBgContent(bgContent: any): void;
    protected crateToolsBar(): void;
    protected rotate(): void;
    clean(): void;
    disable(): void;
    addEventListener(eventName: string, cb: (...e: any[]) => void): void;
    protected onEvent(eventName: string, ...args: any[]): void;
    dataUrl(type?: string, quality?: any): string;
    getBoardSize(): {
        width: number;
        height: number;
    };
    /**
     * 获取标准的签字信息
     * 包括点位信息、
     */
    getSignInfo(): {
        data: any[];
        deviceInfo: any;
        fgpInfo: any;
    };
    getSignDetails(): SignValueDetails;
    protected clear(): void;
    destory(): void;
}
