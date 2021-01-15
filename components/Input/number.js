export function handleInput(input, options) {
    const changeEvents = [
        "input", "keydown", "keyup", "mousedown",
        "mouseup", "select", "contextmenu", "drop",
    ];
    const { pattern, actions } = options;

    function eventListener () {
        if (pattern instanceof RegExp && pattern.test(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (Object.hasOwnProperty.call(this, "oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    }

    changeEvents.forEach((event) => {
        input.addEventListener(event, eventListener);
    });

    return {
        destroy: () => {
            changeEvents.forEach((event) => {
                input.removeEventListener(event, eventListener);
            });
        },
    };
}