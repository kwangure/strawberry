<script context="module">
    export const docs = true;
</script>

<script>
    import { HighlightJS } from "highlight.js/lib/core";

    /**
     * @template T
     * @typedef {{ name: T, highlighter: function }} Language<T>
     */

    /**
     * Which syntax highlighter to use.
     * @type {Language<"css" | "html" | "javascript"> | "svelte" | "xml">}
     */
    export let language = null;

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
     * Whether to use the dark editor.
     * @type {boolean}
     */
    export let dark = false;

    let highlightedCode = "";
    $: if (language) {
        const { name, highlighter } = language;
        HighlightJS.registerLanguage(name, highlighter);
        ({ value: highlightedCode } = HighlightJS.highlight(code, {
            language: name,
        }));
    } else {
        highlightedCode = code;
    }
</script>

<pre class="berry-code hljs" class:dark class:inline>
    <div class="language-{language?.name || ''}">
        {@html highlightedCode}
    </div>
</pre>

<style>
    :export {
        --br-code-background: ;
        --br-code-border-radius: ;
        --br-code-string-color: ;
        --br-code-comment-color: ;
        --br-code-white-space: ;
    }
    pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: var(--br-code-background, var(--br-grey-lightest));
        border-radius: var(--br-code-border-radius, var(--br-border-radius));
        margin: 0;
        white-space: var(--br-code-white-space, pre);
    }
    :global(.br-dark) pre {
        background-color: #1e1e1e;
        color: #dcdcdc;
    }
    [class^="language-"] {
        display: contents;
    }
    .inline {
        display: inline;
        padding: 0.6ch 1ch;
    }
</style>
