import { bubble, get_current_component, listen } from "svelte/internal";

export function createEventForwarder() {
    const component = get_current_component();
    return (node) => {
        const listeners = [];

        for(const event in component.$$.callbacks) {
            const removeListener = listen(node, event, e =>  bubble(component, e));
            listeners.push(removeListener);
        }

        return {
            destroy: () => {
                listeners.forEach(removeListener => removeListener());
            },
        };
    };
}