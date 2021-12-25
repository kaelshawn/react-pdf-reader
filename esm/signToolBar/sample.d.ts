import type { SignSampleBarProps } from './interface';
import SignToolsBar from './main';
declare class SignSampleBar extends SignToolsBar {
    protected options: SignSampleBarProps;
    protected dotsArea: HTMLElement;
    protected samples: any[];
    protected stepResults: any[];
    init(options?: SignSampleBarProps): this;
    protected submit(): Promise<void>;
    protected crateProgressArea(): HTMLDivElement;
    clear(): void;
    protected createDots(): void;
}
export default SignSampleBar;
