import type { PhoneNumber, MetadataJson, Countries, E164Number, CountryCode } from '../types/index.js';
export declare const capitalize: (str: string) => string;
export declare const getCurrentCountry: () => Promise<string | undefined>;
export declare const isNumber: (value: number) => boolean;
export declare const normalizeTelInput: (input?: PhoneNumber) => {
    [k: string]: string | boolean | import("libphonenumber-js/types").NationalNumber | E164Number | import("libphonenumber-js/types").CountryCallingCode | null | undefined;
};
export declare const generatePlaceholder: (country: CountryCode, { format, spaces }?: {
    format: "international" | "national";
    spaces: boolean;
}) => string;
export declare const isSelected: <T extends {
    id: string;
}>(itemToSelect: T | string, selectedItem: (T | undefined | null) | string) => boolean;
export declare const getInternationalPhoneNumberPrefix: (country: CountryCode) => string;
/**
 * Trims phone number digits if they exceed the maximum possible length
 * for a national (significant) number for the country.
 * @param  {string} number - A possibly incomplete phone number digits string. Can be a possibly incomplete E.164 phone number.
 * @param  {string} country
 * @return {string} Can be empty.
 */
export declare const trimNumber: (number: E164Number, country: CountryCode) => string;
export declare const getMaxNumberLength: (country: CountryCode) => number;
/**
 * If the phone number being input is an international one
 * then tries to derive the country from the phone number.
 * (regardless of whether there's any country currently selected)
 * @param {string} partialE164Number - A possibly incomplete E.164 phone number.
 * @param {string?} country - Currently selected country.
 * @param {string[]?} countries - A list of available countries. If not passed then "all countries" are assumed.
 * @return {string?}
 */
export declare const getCountryForPartialE164Number: (partialE164Number: E164Number, { country, countries, required }?: {
    country?: CountryCode;
    countries?: Countries[];
    required?: boolean;
}) => CountryCode | undefined;
/**
 * Determines the country for a given (possibly incomplete) E.164 phone number.
 * @param  {string} number - A possibly incomplete E.164 phone number.
 * @return {string?}
 */
export declare const getCountryFromPossiblyIncompleteInternationalPhoneNumber: (number: E164Number) => CountryCode | undefined;
/**
 * Parses a partially entered national phone number digits
 * (or a partially entered E.164 international phone number)
 * and returns the national significant number part.
 * National significant number returned doesn't come with a national prefix.
 * @param {string} number - National number digits. Or possibly incomplete E.164 phone number.
 * @param {string?} country
 * @return {string} [result]
 */
export declare const getNationalSignificantNumberDigits: (number: E164Number, country: CountryCode) => import("libphonenumber-js/types").NationalNumber | undefined;
/**
 * Checks if a partially entered E.164 phone number could belong to a country.
 * @param  {string} number
 * @param  {CountryCode} country
 * @return {boolean}
 */
export declare const couldNumberBelongToCountry: (number: E164Number, country: CountryCode) => boolean;
export declare const isSupportedCountry: (country: CountryCode, metadata: MetadataJson) => boolean;
/**
 * These mappings map a character (key) to a specific digit that should
 * replace it for normalization purposes.
 * @param {string} character
 * @returns {string}
 */
export declare const allowedCharacters: (character: string, { spaces }?: {
    spaces?: boolean;
}) => string;
export declare const inputParser: (text: string, { allowSpaces, parseCharacter }: {
    allowSpaces: boolean;
    parseCharacter: (char: string, val: string, allowSpaces?: boolean) => string | undefined;
}) => string;
export declare const inspectAllowedChars: (character: string, value: string, allowSpaces?: boolean) => string;
