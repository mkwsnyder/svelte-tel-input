<script>import { createEventDispatcher, onMount } from "svelte";
import { parsePhoneNumberWithError, ParseError } from "libphonenumber-js/max";
import {
  normalizeTelInput,
  getCountryForPartialE164Number,
  generatePlaceholder,
  telInputAction
} from "../../utils/index.js";
const dispatch = createEventDispatcher();
const defaultOptions = {
  autoPlaceholder: true,
  spaces: true,
  invalidateOnCountryChange: false,
  format: "national"
};
export let autocomplete = null;
let classes = "";
export { classes as class };
export let disabled = false;
export let id = "phone-input-" + (/* @__PURE__ */ new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
export let name = null;
export let placeholder = null;
export let readonly = null;
export let required = null;
export let size = null;
export let value;
export let country = void 0;
export let detailedValue = null;
export let valid = true;
export let options = defaultOptions;
export let el = void 0;
let inputValue = value;
let prevCountry = country;
const combinedOptions = {
  ...defaultOptions,
  ...options
};
const handleInputAction = (value2) => {
  if (disabled || readonly) return;
  handleParsePhoneNumber(value2, country);
};
const updateCountry = (countryCode) => {
  if (countryCode !== country) {
    country = countryCode;
    prevCountry = country;
    dispatch("updateCountry", country);
  }
  return country;
};
const handleParsePhoneNumber = (rawInput, currCountry = null) => {
  const input = rawInput;
  if (input !== null) {
    const numberHasCountry = getCountryForPartialE164Number(input);
    if (numberHasCountry && numberHasCountry !== prevCountry) {
      updateCountry(numberHasCountry);
    }
    try {
      detailedValue = normalizeTelInput(
        parsePhoneNumberWithError(input, numberHasCountry ?? currCountry ?? void 0)
      );
    } catch (err) {
      if (err instanceof ParseError) {
        detailedValue = {
          isValid: false,
          error: err.message
        };
        dispatch("parseError", err.message);
      } else {
        throw err;
      }
    }
    const formatOption = combinedOptions.format === "national" ? "nationalNumber" : "e164";
    const formattedValue = combinedOptions.format === "national" ? "formatOriginal" : "formatInternational";
    if (combinedOptions.spaces && detailedValue?.[formattedValue]) {
      inputValue = detailedValue[formattedValue] ?? null;
    } else if (detailedValue?.[formatOption]) {
      inputValue = detailedValue[formatOption] ?? null;
    }
    value = detailedValue?.e164 ?? input ?? null;
    valid = detailedValue?.isValid ?? false;
    dispatch("updateValid", valid);
    dispatch("updateValue", value);
    dispatch("updateDetailedValue", detailedValue);
  } else if (input === null && currCountry !== null) {
    if (currCountry !== prevCountry) {
      prevCountry = currCountry;
      valid = !options.invalidateOnCountryChange;
      value = null;
      inputValue = null;
      detailedValue = null;
      dispatch("updateValid", valid);
      dispatch("updateValue", value);
      dispatch("updateDetailedValue", detailedValue);
    }
  } else {
    valid = true;
    value = null;
    detailedValue = null;
    prevCountry = currCountry;
    dispatch("updateValid", valid);
    dispatch("updateDetailedValue", detailedValue);
    inputValue = null;
  }
};
let countryWatchInitRun = true;
const countryChangeWatchFunction = (current) => {
  if (!countryWatchInitRun) {
    handleParsePhoneNumber(null, current);
  }
  countryWatchInitRun = false;
};
$: countryChangeWatchFunction(country);
$: getPlaceholder = combinedOptions.autoPlaceholder && country ? generatePlaceholder(country, {
  format: combinedOptions.format,
  spaces: combinedOptions.spaces
}) : placeholder;
$: if (value === null && inputValue !== null && detailedValue !== null) {
  inputValue = null;
  detailedValue = null;
  dispatch("updateDetailedValue", detailedValue);
}
export const updateValue = (newValue, newCountry) => {
  const castedValue = newValue;
  if (castedValue) {
    handleParsePhoneNumber(
      castedValue,
      getCountryForPartialE164Number(castedValue) || newCountry
    );
  }
};
onMount(() => {
  if (value) {
    handleParsePhoneNumber(value, getCountryForPartialE164Number(value) || country);
  }
});
</script>

<input
	{...$$restProps}
	bind:this={el}
	{autocomplete}
	class={classes}
	{disabled}
	{id}
	{name}
	{readonly}
	{required}
	{size}
	placeholder={getPlaceholder}
	type="tel"
	value={inputValue}
	on:beforeinput
	on:blur
	on:change
	on:click
	on:focus
	on:input
	on:keydown
	on:keypress
	on:keyup
	on:paste
	use:telInputAction={{
		handler: handleInputAction,
		spaces: combinedOptions.spaces,
		value
	}}
/>
