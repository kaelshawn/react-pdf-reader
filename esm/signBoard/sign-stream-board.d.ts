/// <reference types="node" />
import { Transform, Writable } from 'stream';
import SignBoard from './main';
declare type SignStreamBoardProps = {
    id?: string | number;
    url?: string;
    isMaster?: boolean;
    pipe?: Transform | Writable;
    scale?: number;
    forceChangeSize?: boolean;
};
export default class SignStreamBoard extends SignBoard {
    private isMaster;
    private scale;
    private forceChangeSize;
    private pipe?;
    constructor(props?: SignStreamBoardProps);
    protected updateCanvasSize(): void;
    dataUrl(type?: string, quality?: any): string;
    protected rotate(): void;
    protected changeCanvas(): void;
    setScale(scale: number): void;
    protected createCanvas(): void;
    destory(): void;
}
export {};
