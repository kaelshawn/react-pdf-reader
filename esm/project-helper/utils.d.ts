import { OverlayTypeNames } from '../pdf-reader-v2/overlay';
import { Position } from '../pdf-reader-v2/types';
import { SignInfoItem } from './type';
export declare const buildPosition: (type: OverlayTypeNames, totals: number) => Array<Position>;
export declare const filesToSignFiles: (files: FileList | Array<any> | number, fixPosition: boolean) => Array<SignInfoItem>;
export declare function isFile(value: any): value is File;
