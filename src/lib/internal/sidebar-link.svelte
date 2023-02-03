<script>
	import { page } from '$app/stores';

	/** @type {string} */
	export let href;
</script>

<a href={href} class="br-list-item"
	aria-current={href === $page.url.pathname ? 'page' : null}>
	<slot/>
</a>