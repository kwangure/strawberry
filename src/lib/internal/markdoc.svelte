<script>
	import { css, javascript, mixedHTML, svelte } from '$lib/code';

	/**
	 * @type {import('@markdoc/markdoc').RenderableTreeNode}*/
	export let element;

	/** @type {Record<string, import('$lib/code').Highlighter>}*/
	const highlighters = {
		css,
		html: mixedHTML,
		javascript,
		svelte,
	};

	/**
	 * @param {string} language
	 */
	function highlighter(language) {
		if (Object.hasOwn(highlighters, language)) {
			return highlighters[language];
		}
		return (/** @type {string} */ x) => [{ segment: x, color: '' }];
	}

	// Use func to type output because svelte-check parser doesn't
	// support inline comments, i.e jsdoc
	/**
	 * @param {import("@markdoc/markdoc").Tag<string, Record<string, any>>} element
	 */
	function code(element) {
		const [code] = /** @type {string[]}*/(element.children);
		return code;
	}

	$: if (typeof element !== 'string' && element?.name === 'a') {
		Object.assign(element.attributes, { class: 'colored' });
	}
</script>

{#if typeof element === 'string'}
<!--Do not indent since element might be <pre/>-->
{element}
{:else if element !== null}
	{#if element.name === 'code' || element.name === 'pre'}
		{@const language = element?.attributes?.['data-language']}
		<code class:br-code-inline={element.name === 'code'}>
			{#if language}
				{#each highlighter(language)(code(element)) as { segment, color }}
					{#if color}
						<span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
					{:else}
						{segment}
					{/if}
				{/each}
			{:else}
				{element.children}
			{/if}
		</code>
	{:else}
		<svelte:element this={element.name} {...element?.attributes}>
			{#each element.children as child}
				<svelte:self element={child}/>
			{/each}
		</svelte:element>
	{/if}
{/if}
