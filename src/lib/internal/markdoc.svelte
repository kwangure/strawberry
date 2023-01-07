<script>
	import { Code, css, javascript, mixedHTML, svelte } from '$lib/default/code';

	/**
	 * @type {import('@markdoc/markdoc').RenderableTreeNode}*/
	export let element;

	/** @type {Record<string, import('$lib/default/code').Highlighter>}*/
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
		<Code highlight={highlighter(element?.attributes?.['data-language'])}
			inline={element.name === 'code'} code={code(element)}/>
	{:else}
		<svelte:element this={element.name} {...element?.attributes}>
			{#each element.children as child}
				<svelte:self element={child}/>
			{/each}
		</svelte:element>
	{/if}
{/if}
