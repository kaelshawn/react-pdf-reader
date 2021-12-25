export declare const queryStr: (obj?: {}, q?: URLSearchParams) => string;
export declare const queryParse: (str: any) => {};
export declare function printLog(str: any): void;
export declare function getPxValue(str: any): number;
export declare function getPxString(value: any): string;
export declare function addPx(px1: any, px2: any, format?: any): number;
export declare function getRequest(key: any, urlStr: any): any;
export declare function switchClass(element: HTMLElement, className: string): void;
export declare function setStyles(element: HTMLElement, styles: any): void;
export declare function createElementInsert<T extends HTMLElement>(type: string, parentElement: HTMLElement, classNames?: string[] | string, attrs?: Object, ref?: ChildNode | null): T;
export declare function createElementTo<T extends HTMLElement>(type: string, parentElement: HTMLElement, classNames?: string[] | string, attrs?: Object): T;
export declare function createElement<T extends HTMLElement>(type: string, classNames?: string[] | string, attrs?: Object): T;
export declare function cssToString(styleObj: any): string;
export declare function fileToBase64(file: File): Promise<string>;
export declare function toJson(str: string, defValue?: any): any;
export declare function emptyElement(elem: HTMLElement): void;
export declare function getElementById(id: string): HTMLElement;
export declare function base64ToImg(base64: string): string;
export declare function hide(element: HTMLElement): void;
export declare function show(element: HTMLElement, orign?: 'block' | 'flex' | 'inline' | 'inlineBlock'): void;
export declare function closestByClassName(element: HTMLElement, className: string): any;
export declare function copyParse<T>(value: T): T;
export declare function dateFormat(date: any, fmt: any): any;