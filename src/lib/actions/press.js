import { createAddEventListener, isSelfTarget, queueBeforeEvent } from '$lib/utils/events';
import { isDisabled, isTextField } from '../utils/dom';
import { isFirefox } from '../utils/platform';

/** @type {import('svelte/action').Action} */
export function press(element) {
	const listen = createAddEventListener();

	/**
	 * @param {Event} event
	 */
	function dispatchPress(event) {
		// Pass along the previous event state in new event.
		const press = new CustomEvent('press', event);
		element.dispatchEvent(press);
	}

	// Allows us not to emit press for spacebar on keyup if keydown was
	// prevented/disabled in some way
	let keydownDone = false;
	listen(element, 'click', dispatchPress);
	listen(element, 'keydown', (_event) => {
		const event = /** @type {KeyboardEvent} */(_event);

		if (event.defaultPrevented) return;
		if (!isSelfTarget(event)) return;

		if (element.isContentEditable) return;
		if (isDisabled(element)) return;
		if (isTextField(element)) return;

		const { key } = event;
		if (key === 'Enter') {
			const press = () => dispatchPress(event);
			// If this element is a link with target="_blank", Firefox will
			// block the "popup" if the click event is dispatched synchronously
			// or in a microtask. Queueing the event asynchronously fixes that.
			if (isFirefox()) {
				queueBeforeEvent(element, 'keyup', press);
			} else {
				// When activating links with Cmd/Ctrl+Enter, some browsers
				// don't open the new tab in the background. Instead, the new
				// tab is brought to the front.

				// We dispatch the press event in a microtask that will be
				// executed at the end of the current event loop.
				queueMicrotask(press);
			}
		} else if (key === ' ') {
			keydownDone = true;
		}
	});
	listen(element, 'keyup', (_event) => {
		const event = /** @type {KeyboardEvent} */(_event);

		// Reset `keydownDone` in case we return early
		const prevKeydownDone = keydownDone;
		keydownDone = false;

		if (event.defaultPrevented) return;
		if (event.metaKey) return;
		if (isDisabled(element)) return;

		// Emit when spacebar is released
		if (prevKeydownDone && event.key === ' ') {
			queueMicrotask(() => dispatchEvent(event));
		}
	});
}
