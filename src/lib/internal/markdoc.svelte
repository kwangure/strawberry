<script>
    /**
     * @type {import('@markdoc/markdoc').RenderableTreeNode}*/
    export let element;
</script>

{#if typeof element === 'string'}
<!--Do not indent since element might be <pre/>-->
{element}
{:else if element !== null}
    <svelte:element this={element?.name} {...element?.attributes}>
        {#each element.children as child}
            <svelte:self element={child}/>
        {/each}
    </svelte:element>
{/if}
