/**
 * @param {Node | null | undefined} node
 */
export function ownerDocument(node) {
	return node?.ownerDocument || document;
}

/**
 * @param {Node | undefined} node
 */
export function ownerWindow(node) {
	const doc = ownerDocument(node);
	return doc.defaultView || window;
}
