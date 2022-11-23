<script>
    import { Code, javascript, plainHTML } from '$lib/default/code';

    /**
     * @type {import('@markdoc/markdoc').RenderableTreeNode}*/
    export let element;

    /** @type {Record<string, (code: string) => string>}*/
    const highlighters = {
    	html: plainHTML,
    	javascript,
    };

    /**
     * @param {string} language
     */
    function highlighter(language) {
    	if (Object.hasOwn(highlighters, language)) {
    		return highlighters[language];
    	}
    	return (/** @type {string}*/x) => x;
    }
</script>

{#if typeof element === 'string'}
<!--Do not indent since element might be <pre/>-->
{element}
{:else if element !== null}
    {#if element.name === 'code' || element.name === 'pre'}
        {@const [code] = /** @type {string[]}*/(element.children)}
        <Code highlight={highlighter(element?.attributes?.['data-language'])}
            inline={element.name === 'code'} code={code}/>
    {:else}
        <svelte:element this={element.name} {...element?.attributes}>
            {#each element.children as child}
                <svelte:self element={child}/>
            {/each}
        </svelte:element>
    {/if}
{/if}
