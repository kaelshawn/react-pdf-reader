declare const _default: () => {
    goto: (path: string, isRedirect?: boolean, success?: () => void) => void;
    back: (delta?: number) => void;
    gotoFaceAuth: (params?: any) => Promise<unknown>;
    getFaceInfo: (gotoType?: number) => Promise<unknown>;
};
export default _default;
