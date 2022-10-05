// eslint-disable-next-line camelcase
import { bubble, get_current_component, listen } from 'svelte/internal';

export function createEventForwarder() {
	const component = get_current_component();
	return (/** @type {EventTarget} */ node) => {
		/**
		 * @type {(() => void)[]}
		 */
		const listeners = [];

		for (const event in component.$$.callbacks) {
			if ({}.hasOwnProperty.call(component.$$.callbacks, event)) {
				const removeListener = listen(node, event, (event) => {
					bubble(component, event);
				});
				listeners.push(removeListener);
			}
		}

		return {
			destroy: () => {
				listeners.forEach((removeListener) => removeListener());
			},
		};
	};
}
