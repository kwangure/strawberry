import { bubble, get_current_component, listen } from 'svelte/internal';

export function createEventForwarder() {
	const component = get_current_component();
	/**
	 * @param {EventTarget} node
	 */
	return (node) => {
		for (const event in component.$$.callbacks) {
			if ({}.hasOwnProperty.call(component.$$.callbacks, event)) {
				const removeListener = listen(node, event, (event) => {
					bubble(component, event);
				});
				component.$$.on_destroy.push(removeListener);
			}
		}
	};
}

export function createAddEventListener() {
	const component = get_current_component();
	/**
	 * @param {EventTarget} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions} [options]
	 * @returns {() => void}
	 */
	// eslint-disable-next-line max-params
	return (node, event, handler, options) => {
		const removeListener = listen(node, event, handler, options);
		component.$$.on_destroy.push(removeListener);
		return removeListener;
	};
}
