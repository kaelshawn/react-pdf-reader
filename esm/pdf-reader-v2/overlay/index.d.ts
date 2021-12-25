import Seal from './seal';
import Sign from './sign';
export declare const OverlayTypes: {
    Sign: typeof Sign;
    Seal: typeof Seal;
};
export declare type TypeOverlay = {
    Sign: Sign;
    Seal: Seal;
};
export declare type OverlayTypeNames = keyof typeof OverlayTypes;
export declare const DefaultSize: Record<OverlayTypeNames, {
    width: number;
    height: number;
}>;
export declare const OverlayTypeChianNames: Record<OverlayTypeNames, string>;
