/**
 * @param {{ (): void }} func
 */
export default function debounce(func, wait = 166) {
	/**
     * @type {string | number | NodeJS.Timeout}
     */
	let timeout;
	/**
     * @param {any[]} args
     */
	function debounced(...args) {
		const later = () => {
			// @ts-ignore
			// eslint-disable-next-line no-invalid-this
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}

	debounced.clear = () => {
		clearTimeout(timeout);
	};

	return debounced;
}
