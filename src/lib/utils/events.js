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

/**
 * Returns `true` if `event.target` and `event.currentTarget` are the same.
 *
 * @param {Event} event
 */
export function isSelfTarget(event) {
	return event.target === event.currentTarget;
}


/**
 * Runs a callback on the next animation frame, but before a certain event.
 *
 * {@link https://github.com/ariakit/ariakit/blob/main/packages/ariakit-utils/src/events.ts#LL157-L180C2}
 *
 * @param {HTMLElement} element
 * @param {string} type
 * @param {() => any} handler
 */
export function queueBeforeEvent(element, type, handler) {
	const raf = requestAnimationFrame(() => {
		element.removeEventListener(type, callImmediately, true);
		handler();
	});

	function callImmediately() {
		cancelAnimationFrame(raf);
		handler();
	}

	// By listening to the event in the capture phase, we make sure the handler
	// is fired before the `type` event.
	element.addEventListener(type, callImmediately, {
		once: true,
		capture: true,
	});

	return raf;
}
