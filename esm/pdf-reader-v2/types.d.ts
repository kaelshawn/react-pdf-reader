import PdfLoader, { LoaderProps } from './loader';
import PdfThumb, { ThumbProps } from './thumb';
export declare type PdfReaderPorps = {
    container: HTMLElement;
    status?: ReaderStatus;
    thuembContainer?: HTMLElement | boolean;
    /**
     * 默认为pc
     */
    mode?: PdfMode;
    /**
     * pdf数据源
     */
    dataSource?: PdfDataSourceParams[];
    /**
     * pdf加载器
     */
    loaderFactory?: (props: LoaderProps) => PdfLoader;
    /**
     * 缩略图
     */
    thumbFactory?: (props: ThumbProps) => PdfThumb;
};
export declare type PdfMode = 'MOBILE' | 'PC';
export declare type PdfDataSourceParams = Omit<PdfDataSource, 'id'>;
/**
 * PDF数据源
 */
export declare type PdfDataSource = {
    /**
     * 目前支持base64和url地址
     */
    value: string | (() => Promise<string>);
    id: string;
    seal?: Position[];
    sign?: Position[];
};
/**
 * 签署组件位置信息
 */
export declare type Position = {
    x: number;
    y: number;
    width?: number;
    height?: number;
    page: number;
    required?: boolean;
    id?: string;
    name?: string;
};
export declare type PdfStatus = {
    /**
     * 缩放比例
     */
    scale: number;
    /**
     * 页码总数
     */
    pagesCount: number;
};
export declare type PointProps = {
    s: number;
    p?: number;
    t?: number;
    x: number;
    y: number;
};
export declare type ReaderStatus = 'INPUT' | 'EDIT';
