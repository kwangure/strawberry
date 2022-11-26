import { createAddEventListener } from '$lib/utils/events';

/** @type {import('svelte/action').Action} */
export function press(element) {
	const listen = createAddEventListener();

	/**
	 * @param {Event} event
	 */
	function dispatchPress(event) {
		const press = new CustomEvent('press', event);
		element.dispatchEvent(press);
	}

	listen(element, 'click', dispatchPress);
}
