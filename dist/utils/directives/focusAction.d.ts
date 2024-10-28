export declare function focusable_children(node: HTMLElement): {
    next: (selector: string) => void;
    prev: (selector: string) => void;
    update: (d: number) => void;
};
export declare function trap(node: HTMLElement): {
    destroy: () => void;
};
