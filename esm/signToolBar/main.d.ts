import type SignBoard from '../signBoard';
import type { SignToolBarProps } from './interface';
declare class SignToolsBar {
    protected options: SignToolBarProps;
    protected signer: SignBoard;
    protected toolsBar: HTMLElement;
    protected btnClear: HTMLElement;
    protected btnCancel: HTMLElement;
    protected btnSubmit: HTMLElement;
    constructor(signer: SignBoard);
    init(options?: SignToolBarProps): this;
    protected submit(): Promise<void>;
}
export default SignToolsBar;
