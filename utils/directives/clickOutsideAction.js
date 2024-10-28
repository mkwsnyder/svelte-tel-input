export const clickOutsideAction = (node, handler, skipPrevented = true) => {
    const handleClick = async (event) => {
        if (skipPrevented) {
            if (!node.contains(event.target) && !event.defaultPrevented)
                handler();
        }
        else {
            if (!node.contains(event.target))
                handler();
        }
    };
    document.addEventListener('click', handleClick, true);
    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
};
