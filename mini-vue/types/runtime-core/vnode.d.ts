import { ShapeFlags } from "../shared";
export declare const createVNode: (type: any, props?: any, children?: string | any[] | undefined) => {
    el: null;
    component: null;
    key: any;
    type: any;
    props: any;
    children: string | any[] | undefined;
    shapeFlag: ShapeFlags;
};
export declare function normalizeChildren(vnode: any, children: any): void;
export declare const Text: unique symbol;
export declare function createTextVNode(text?: string): {
    el: null;
    component: null;
    key: any;
    type: any;
    props: any;
    children: string | any[] | undefined;
    shapeFlag: ShapeFlags;
};
export declare function normalizeVNode(child: any): void;
