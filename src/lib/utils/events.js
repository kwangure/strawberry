import { onDestroy } from 'svelte';

export function createAddEventListener() {
	/** @type {(() => any)[]} */
	const removeEventListeners = [];

	/**
	 * @param {EventTarget} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions} [options]
	 */
	// eslint-disable-next-line max-params
	function addEventListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		const removeEventListener
			= () => node.removeEventListener(event, handler, options);
		removeEventListeners.push(removeEventListener);
		return removeEventListener;
	}

	onDestroy(() => {
		removeEventListeners.forEach((fn) => fn());
	});

	return addEventListener;
}
