<script context="module">
    export const docs = true;
</script>

<script>
    import "$lib/css/styles";
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
    :export {
        --br-code-background-color: ;
        --br-code-text-color: ;
        --br-code-border-radius: ;
        --br-code-string-color: ;
        --br-code-comment-color: ;
        --br-code-white-space: ;
    }
    @media (theme: berry) and (prefers-color-scheme: dark) {
        :scope {
            --_code-background-color: #1e1e1e;
            --_code-text-color: #dcdcdc;

            /* Syntax highlighter */
            --_name-color: #569cd6;
            --_string-color: #d69d85;
            --_value-color: #9cdcfe;
            --_classname-color: #d7ba7d;
            --_comment-color: #6a9955;
            --_number-color: #b5cea8;
            --_type-color: #4ec9b0;
            --_function-color: #dcdcaa;
            --_keyword-color: #c586c0;
        }
    }
    @media (theme: berry) and (prefers-color-scheme: light) {
        :scope {
            --_code-background-color: #f0f0f0;
            --_code-text-color: #333;

            --_name-color: #0021b3;
            --_string-color: #be6404;
            --_value-color: #037e0b;
            --_classname-color: #c79e09;
            --_comment-color: #2f9d62;
            --_number-color: #085ad6;
            --_type-color: #cf222e;
            --_function-color: #0021b3;
            --_keyword-color: #c123b4;
        }
    }
    pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: var(
            --br-code-background-color,
            var(--br-secondary-background-color, var(--_code-background-color))
        );
        color: var(
            --br-code-text-color,
            var(--br-secondary-text-color, var(--_code-text-color))
        );
        border-radius: var(--br-code-border-radius, var(--br-border-radius));
        margin: 0;
        white-space: var(--br-code-white-space, pre);
    }
    code {
        display: contents;
    }
    .inline {
        display: inline;
        padding: 0.15ch 0.5ch;
    }
</style>
