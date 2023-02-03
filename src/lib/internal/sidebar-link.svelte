<script>
	import { page } from '$app/stores';

	/** @type {string} */
	export let href;
</script>

<a href={href} class="br-list-item"
	class:br-list-item-active={href === $page.url.pathname}>
	<slot/>
</a>