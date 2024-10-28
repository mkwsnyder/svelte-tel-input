import { SvelteComponentTyped } from "svelte";
import type { DetailedValue, CountryCode, E164Number, TelInputOptions } from '../../types';
declare const __propDef: {
    props: {
        [x: string]: any;
        autocomplete?: (string | null) | undefined;
        class?: string | undefined;
        disabled?: boolean | undefined;
        id?: string | undefined;
        name?: (string | null) | undefined;
        placeholder?: (string | null) | undefined;
        readonly?: (boolean | null) | undefined;
        required?: (boolean | null) | undefined;
        size?: (number | null) | undefined;
        value: E164Number | null;
        country?: CountryCode | null | undefined;
        detailedValue?: (Partial<DetailedValue> | null) | undefined;
        valid?: boolean | undefined;
        options?: TelInputOptions | undefined;
        el?: HTMLInputElement | undefined;
        updateValue?: ((newValue: string | E164Number | null, newCountry?: CountryCode | null) => void) | undefined;
    };
    events: {
        beforeinput: InputEvent;
        blur: FocusEvent;
        change: Event;
        click: MouseEvent;
        focus: FocusEvent;
        input: Event;
        keydown: KeyboardEvent;
        keypress: KeyboardEvent;
        keyup: KeyboardEvent;
        paste: ClipboardEvent;
        updateCountry: CustomEvent<CountryCode | null>;
        parseError: CustomEvent<string>;
        updateDetailedValue: CustomEvent<Partial<DetailedValue> | null>;
        updateValid: CustomEvent<boolean>;
        updateValue: CustomEvent<E164Number | null>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TelInputProps = typeof __propDef.props;
export type TelInputEvents = typeof __propDef.events;
export type TelInputSlots = typeof __propDef.slots;
export default class TelInput extends SvelteComponentTyped<TelInputProps, TelInputEvents, TelInputSlots> {
    get updateValue(): (newValue: string | E164Number | null, newCountry?: CountryCode | null) => void;
}
export {};
