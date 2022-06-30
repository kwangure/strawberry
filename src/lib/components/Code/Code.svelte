<script context="module">
    export const docs = true;
</script>

<script>
    import "../../css/styles.js";
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
<pre class="berry-code hljs" class:inline><code>{@html language(code.replace(" *{}", ""))}</code></pre>

<style>
    @media (prefers-color-scheme: dark) {
        pre {
            --br-code-background-color: #1e1e1e;
            --br-code-text-color: #dcdcdc;

            /* Syntax highlighter */
            --br-code-syntax-name-color: #569cd6;
            --br-code-syntax-string-color: #d69d85;
            --br-code-syntax-value-color: #9cdcfe;
            --br-code-syntax-classname-color: #d7ba7d;
            --br-code-syntax-comment-color: #6a9955;
            --br-code-syntax-number-color: #b5cea8;
            --br-code-syntax-type-color: #4ec9b0;
            --br-code-syntax-function-color: #dcdcaa;
            --br-code-syntax-keyword-color: #c586c0;
        }
    }
    @media (prefers-color-scheme: light) {
        pre {
            --br-code-background-color: #f0f0f0;
            --br-code-text-color: #333;

            --br-code-syntax-name-color: #0021b3;
            --br-code-syntax-string-color: #312212;
            --br-code-syntax-value-color: #037e0b;
            --br-code-syntax-classname-color: #c79e09;
            --br-code-syntax-comment-color: #2f9d62;
            --br-code-syntax-number-color: #085ad6;
            --br-code-syntax-type-color: #cf222e;
            --br-code-syntax-function-color: #0021b3;
            --br-code-syntax-keyword-color: #c123b4;
        }
    }
    pre {
        --br-code-white-space: pre;
        --br-code-border-radius: var(--br-border-radius);
    }
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
