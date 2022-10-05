/**
 * @param {Node} node
 */
export function mousePosInBoundingRect(node) {
	let onchange = () => {};
	const rect = { x: 0, y: 0, top: 0, left: 0, width: 0, height: 0 };
	node.addEventListener('mousemove', (event) => {
		const { clientX, clientY } = /** @type {PointerEvent} */ (event);
		rect.x = clientX;
		rect.left = clientX;
		rect.y = clientY;
		rect.top = clientY;
		onchange();
	});
	return {
		getBoundingClientRect: () => rect,
		onchange: (/** @type {() => void} */ fn) => {
			onchange = fn;
		},
	};
}

// eslint-disable-next-line max-params
/**
 * @param {{ [x: string]: (arg0: any, arg1: any) => void; }} node
 * @param {Event} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean} add
 */
// eslint-disable-next-line max-params
export function toggleListener(node, event, handler, add) {
	node[add ? 'addEventListener': 'removeEventListener'](event, handler);
}
