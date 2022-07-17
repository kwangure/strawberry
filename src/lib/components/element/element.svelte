<script>
    /**
     * @type {import("./element").DomJson}*/
    export let element;
</script>

{#if typeof element === 'string'}
<!--Do not indent since element might be <pre/>-->
{element}
{:else}
    <svelte:element this={element.type} {...element.props}>
        {#each element.children as child}
            <svelte:self element={child}/>
        {/each}
    </svelte:element>
{/if}
