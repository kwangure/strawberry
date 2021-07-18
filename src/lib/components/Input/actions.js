export function focusElement(htmlElement, focus) {
    function update(focus) {
        if (focus) htmlElement.focus();
    }

    update(focus);

    return { update };
}
