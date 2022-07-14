export function isSVGChild(node) {
	return node instanceof SVGElement && node.ownerSVGElement !== null;
}

export function getSVGParent(svgElement) {
	const svgTag = svgElement.ownerSVGElement === null
		? svgElement
		: svgElement.ownerSVGElement;
	return svgTag.parentNode;
}
