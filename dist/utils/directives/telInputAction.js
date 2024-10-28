import { inspectAllowedChars, inputParser } from '../../index.js';
export const telInputAction = (node, { handler, spaces }) => {
    const onInput = (event) => {
        if (node && node.contains(event.target)) {
            const currentValue = event.target.value;
            const formattedInput = inputParser(currentValue, {
                parseCharacter: inspectAllowedChars,
                allowSpaces: spaces
            });
            node.value = formattedInput;
            handler(formattedInput);
        }
    };
    node.addEventListener('input', onInput, true);
    return {
        update(params) {
            if (params.value === null || params.value === '') {
                node.value = '';
            }
        },
        destroy() {
            node.removeEventListener('input', onInput, true);
        }
    };
};
