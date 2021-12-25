import { OverlayTypeNames } from '.';
import PdfReader from '..';
export declare type Rectangle = {
    height: number;
    width: number;
    x: number;
    y: number;
};
export declare type OverlayBaseProps = {
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    x: number;
    y: number;
    page: number;
    pdfReader: PdfReader;
    /**
     * 默认 LEFT_TOP
     */
    origin?: ORIGIN_TYPE;
    required?: boolean;
    id?: string;
    type: OverlayTypeNames;
    /**
     * 是否自由签
     */
    isFree?: boolean;
};
export declare type ORIGIN_TYPE = 'LEFT_TOP' | 'LEFT_BOTTOM' | 'CENTER';
export declare type DIRECTION = 'LEFT_TOP' | 'LEFT_BOTTOM' | 'RIGHT_TOP' | 'RIGHT_BOTTOM';
