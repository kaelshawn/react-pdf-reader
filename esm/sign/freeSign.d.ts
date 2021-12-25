import type { FreeApiProps, FreeSignProps, UserProps } from './interface';
import BaseSign from './main';
/**
 * 根据文件id进行自由签署
 *
 */
export default class FressSign extends BaseSign {
    protected apiServer: FreeApiProps;
    protected options: FreeSignProps;
    protected user: UserProps;
    protected fileUrl: string;
    protected fileName: string;
    constructor(options: FreeApiProps);
    init(options: FreeSignProps): this;
    protected getFileList(): {
        currentFileId?: string;
        widgetContent?: {
            fields: {}[];
            sign: {
                x: number;
                y: number;
                width: number;
                height: number;
                id: string;
                page: number;
                signatoriesUuid: string;
                required: boolean;
                name: string;
                group?: string;
            }[];
            seal: {
                x: number;
                y: number;
                width: number;
                height: number;
                id: string;
                page: number;
                signatoriesUuid: string;
                required: boolean;
                name: string;
            }[];
        };
        fileName: string;
        url: string;
    }[];
    protected getFileId(index: any): string;
    protected loadFile(): void;
    protected switchPdf(): void;
    protected buildToolBar(): void;
    protected canOprtate(): boolean;
    protected submitSign(): void;
}
