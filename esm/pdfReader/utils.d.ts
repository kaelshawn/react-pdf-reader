import type { IPDFPageInfo, IPagePlaceValue } from './interface';
/**
 * 判断是否点击的是组件
 * @param e
 */
declare function isClickOverlay(e: any): boolean;
declare function getPdfPageInfoByEvent(e: any): IPDFPageInfo;
declare function getPdfPageClickInfo(e: any, scale?: number): IPagePlaceValue;
declare const _default: {
    getPdfPageClickInfo: typeof getPdfPageClickInfo;
    getPdfPageInfoByEvent: typeof getPdfPageInfoByEvent;
    isClickOverlay: typeof isClickOverlay;
};
export default _default;
