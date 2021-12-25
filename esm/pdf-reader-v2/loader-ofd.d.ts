import PdfLoader from './loader';
export declare type OfdPageView = {
    div: HTMLDivElement;
    wrapper: HTMLDivElement;
    viewport: {
        scale: number;
    };
};
export default class OfdLoader extends PdfLoader {
    protected pageViews: Array<OfdPageView>;
    protected init(): void;
    protected load(value: string): void;
}
