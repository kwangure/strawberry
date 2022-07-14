import { readable } from 'svelte/store';

let windowLocation = null;
if (typeof window !== 'undefined') {
	windowLocation = window.location;
}

const location = readable(windowLocation, (set) => {
	if (typeof window === 'undefined') return;

	function setLocation() {
		set(window.location);
	}

	window.addEventListener('DOMContentLoaded', setLocation);
	window.addEventListener('hashchange', setLocation);

	return () => {
		window.removeEventListener('DOMContentLoaded', setLocation);
		window.removeEventListener('hashchange', setLocation);
	};
});

export default location;
