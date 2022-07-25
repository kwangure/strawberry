<!--
    @component

    Code highlights snippets of code that appears along with body text, while
    preserving its formatting.

    Use inline code snippets when you wish to highlight a short code snippet
    from the surrounding default text, such as when referencing variable names.
-->
<script>
    /**
     * @template T
     * @typedef {{ name: T, highlighter: function }} Language<T>
     */

    /**
     * Which syntax highlighter to use.
     * @type {Language<"css" | "html" | "javascript"> | "svelte" | "xml">}
     */
    export let language;

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
</script>

<!-- Leave as one long line since `pre` preserves whitespace-->
<pre class="berry-code hljs" class:inline><code>{@html language(code.replace(' *{}', ''))}</code></pre>

<style>
    pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: var(--br-code-root-background-color);
        color: var(--br-code-root-font-color);
        border-radius: var(--br-code-root-border-radius);
        margin: 0;
        white-space: var(--br-code-root-white-space);
    }
    code {
        display: contents;
    }
    .inline {
        display: inline;
        padding: 0.15ch 0.5ch;
    }
</style>
