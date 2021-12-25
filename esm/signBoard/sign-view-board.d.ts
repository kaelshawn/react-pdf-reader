declare enum EnumModeType {
    MOBILE = "MOBILE",
    PC = "PC"
}
declare type SignViewBoardProps = {
    container: HTMLElement;
    width?: number;
    mode?: EnumModeType;
};
declare type PointProps = {
    s: number;
    p?: number;
    t?: number;
    x: number;
    y: number;
};
declare type sizeProps = Record<'width' | 'height', number>;
export default class SignViewBoard {
    private container;
    private signBoard?;
    private socketTransformer;
    private canvasWidth;
    private points;
    private mode;
    constructor(props: SignViewBoardProps);
    private createStream;
    private updateScale;
    write(data: Array<PointProps>): void;
    writePoint(point: PointProps): void;
    createSignBoard(size: sizeProps, fakePressure?: boolean, maxPressure?: number): this;
    clean(): void;
    close(): void;
    getSignInfo(): {
        points: any;
        dataUrl: string;
        boardWidth: number;
        boardHeight: number;
        info: {
            data: any[];
            deviceInfo: any;
            fgpInfo: any;
        };
    };
    setColor(color: any): void;
    static PC_MODE: EnumModeType;
    static MOBILE_MODE: EnumModeType;
}
export {};
