import EventBase from '../../utils/eventBase2';
export declare type VariableMoveEvent = {
    onMoved: {
        x: number;
        y: number;
    };
};
export declare type VariableMoveConfig = {
    scale: number;
};
export declare type VariableMoveProps = {
    target: HTMLElement;
    config: () => VariableMoveConfig;
};
/**
 * 可变尺寸
 */
export declare class VariableMove extends EventBase<VariableMoveEvent> {
    protected target: HTMLElement;
    protected config: () => VariableMoveConfig;
    constructor(props: VariableMoveProps);
    protected init(): void;
}
