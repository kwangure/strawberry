export function mousePosInBoundingRect(node) {
	let onchange = () => {};
	const rect = { x: 0, y: 0, top: 0, left: 0, width: 0, height: 0 };
	node.addEventListener('mousemove', (event) => {
		rect.x = event.clientX;
		rect.left = event.clientX;
		rect.y = event.clientY;
		rect.top = event.clientY;
		onchange();
	});
	return {
		getBoundingClientRect: () => rect,
		onchange: (fn) => {
			onchange = fn;
		},
	};
}

// eslint-disable-next-line max-params
export function toggleListener(node, event, handler, add) {
	node[add ? 'addEventListener': 'removeEventListener'](event, handler);
}
