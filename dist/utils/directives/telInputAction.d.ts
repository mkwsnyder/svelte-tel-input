import type { E164Number } from 'libphonenumber-js';
export declare const telInputAction: (node: HTMLInputElement, { handler, spaces }: {
    handler: (val: string) => void;
    spaces: boolean;
    value: E164Number | null;
}) => {
    update(params: {
        handler: (val: string) => void;
        spaces: boolean;
        value: E164Number | null;
    }): void;
    destroy(): void;
};
