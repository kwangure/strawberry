import './index.css';
import '../../css/reset.css';
import '../../css/globals.css';
import Code from '$lib/components/code/code.svelte';

export default Code;
export { default as css } from '$lib/components/code/languages/css.js';
export { default as html } from '$lib/components/code/languages/html.js';
export { default as javascript } from '$lib/components/code/languages/javascript.js';
export { default as js } from '$lib/components/code/languages/javascript.js';
export { default as none } from '$lib/components/code/languages/none.js';
export { default as svelte } from '$lib/components/code/languages/svelte.js';
