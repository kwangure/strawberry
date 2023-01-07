<!--
    @component

    Code highlights snippets of code that appears along with body text, while
    preserving its formatting.

    Use inline code snippets when you wish to highlight a short code snippet
    from the surrounding default text, such as when referencing variable names.
-->
<script>
    /**
     * A syntax highlighter that assigns highlight colors to code segments
     *
     * @type {((code: string) => { color: string, segment: string }[]) | undefined}
     */
    export let highlight = undefined;

    /**
     * Code to be highlighted
     @type {string}
     */
    export let code;

    /**
     * Whether to treat a codeblock as an inline element.
     * @type {boolean}
     */
    export let inline = false;

    /**
     * @param {string} x
     */
    function stub(x) {
    	return [{ segment: x, color: '' }];
    }

    $: _highlight = highlight || stub;
    $: segments = _highlight(code);
</script>

<code class:inline>
    {#each segments as { segment, color }}
        {#if color}
            <span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
        {:else}
            {segment}
        {/if}
    {/each}
</code>

<style>
    code {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: var(--br-code-root-background-color);
        color: var(--br-code-root-font-color);
        border-radius: var(--br-code-root-border-radius);
        margin: 0;
        white-space: var(--br-code-root-white-space);
        tab-size: var(--br-code-root-tab-size, 4);
        display: block;
        font-family: monospace;
    }
    .inline {
        display: inline;
        padding: 0.15ch 0.5ch;
    }
</style>
