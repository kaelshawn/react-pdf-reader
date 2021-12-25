/// <reference types="node" />
import { Transform, Writable } from 'stream';
export declare type Point = XY & {
    p: number;
    s: EnumPointEventType;
    t: number;
    v?: number;
};
export declare type XYV = XY & {
    v: number;
};
export declare type XY = {
    x: number;
    y: number;
};
export declare enum EnumPointEventType {
    down = 0,
    move = 1,
    up = 2
}
export declare class PointStream extends Transform {
    protected lastPoint?: Required<Point> & {
        middlePoint?: XY;
    };
    constructor();
    protected line(start: XYV, end: XYV): void;
    protected bezierCurve(start: XYV, end: XYV, ctrl: XY): void;
    _transform(point: Point, _: any, callback: any): void;
}
export declare type BrushStreamProps = {
    canvas: HTMLCanvasElement;
    color?: string;
};
export declare class BrushStream extends Writable {
    canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    constructor(props: BrushStreamProps);
    _write(chunk: Point, encode: any, done: any): void;
}
export declare type DOMPointerStreamProps = {
    dom: HTMLElement;
};
export declare class DOMPointerStream extends Transform {
    dom: HTMLElement;
    protected domRect: DOMRect;
    protected lastTime?: number;
    protected isDraw: boolean;
    constructor(props: DOMPointerStreamProps);
    _transform(e: PointerEvent, encode: any, callback: any): void;
    protected create(): void;
}
