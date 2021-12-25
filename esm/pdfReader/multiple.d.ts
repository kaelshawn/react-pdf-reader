/**
 * 多PDF共用一个reader时提供切换功能
 */
import type PdfReader from './main';
import EventBase from '../utils/eventBase';
import type { ISignFile, ITemplateFile } from './interface';
import { OverlayPositionValueInfo } from './overlayAdapter';
export default class Multiple extends EventBase {
    currentFileId: string | null;
    protected signFiles: ISignFile[] | undefined;
    protected allValues: {};
    protected freeSignInfo: any;
    protected values: {};
    protected widgetInfos: {};
    protected templateFiles: ITemplateFile[] | undefined;
    pdfReader: PdfReader;
    constructor(pdfReader: PdfReader, signFiles?: ISignFile[], templateFiles?: ITemplateFile[]);
    private getSignFileById;
    private getTemplateFileById;
    private setCurrentValues;
    private setCurrentTemplate;
    switch(pdf: string, fileId: string, sign?: boolean, cb?: any, errcb?: any): void;
    switchTemplate(pdf: string, templateId: string, userTag: any): void;
    getValues(isRequired?: boolean): any[];
    /**
     * 根据WidgetContent获取所有的签署位的__value值
     * 兼容多个文件的处理
     */
    getFileValuesByWidgetContent(fileId?: string): OverlayPositionValueInfo[];
    /**
     *
     * @param isRequired 是否判断必填项
     * @returns
     */
    getWidgetInfos(): any[];
    /**
     * 获取快照
     */
    getSnapshot(): any;
    /**
     * 设置快照
     */
    reSnapshot({ isTemplate, isSign, ...snapshot }: {
        [x: string]: any;
        isTemplate: any;
        isSign: any;
    }): void;
    private checkRequired;
}
