/**
 * https://github.com/sveltejs/kit/blob/e3544597bee62a43a0254490532f1f3663703d2d/packages/kit/src/exports/vite/utils.js#L72
 *
 * Merges b into a, recursively, mutating a.
 * @param {Record<string, any>} a
 * @param {Record<string, any>} b
 */
export function mergeInto(a, b) {
	/**
    * Checks for "plain old Javascript object", typically made as an object
    * literal. Excludes Arrays and built-in types like Buffer.
    * @param {any} x
    */
	const isPlainObject = (x) => typeof x === 'object' && x.constructor === Object;

	for (const prop in b) {
		if (isPlainObject(b[prop])) {
			if (!isPlainObject(a[prop])) {
				a[prop] = {};
			}
			mergeInto(a[prop], b[prop]);
		} else if (Array.isArray(b[prop])) {
			if (!Array.isArray(a[prop])) {
				a[prop] = [];
			}
			a[prop].push(...b[prop]);
		} else {
			a[prop] = b[prop];
		}
	}

	return a;
}
