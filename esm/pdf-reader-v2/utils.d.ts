import { ORIGIN_TYPE } from './overlay/types';
export declare const addIdProperty: (value: any) => any;
export declare const getXY: (props: {
    left: number;
    top: number;
    width: number;
    height: number;
    origin: ORIGIN_TYPE;
    parentHeight: number;
}) => {
    x: number;
    y: number;
};
export declare const getLeftTop: (props: {
    x: number;
    y: number;
    width: number;
    height: number;
    origin: ORIGIN_TYPE;
    parentHeight: number;
}) => {
    left: number;
    top: number;
};
