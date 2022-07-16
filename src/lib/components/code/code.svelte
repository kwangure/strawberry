<script context="module">
    // TODO: Remove docs variable from component
    export const docs = true;
</script>

<!-- TODO: Add a component description here. See button for example -->
<script>
    import '../../css/styles.js';
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
        background-color: var(--br-code-background-color);
        color: var(--br-code-text-color);
        border-radius: var(--br-code-border-radius);
        margin: 0;
        white-space: var(--br-code-white-space);
    }
    code {
        display: contents;
    }
    .inline {
        display: inline;
        padding: 0.15ch 0.5ch;
    }
</style>
