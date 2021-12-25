interface ScrollToOptions {
    getContainer?: () => HTMLElement | Window | Document;
    callback?: () => any;
    duration?: number;
    offset?: number;
}
export default function scrollTo(y: number, options?: ScrollToOptions): void;
export declare function scrollToElement(element: HTMLElement, options?: ScrollToOptions): void;
export {};
