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

    /**
     * Whether to use the dark editor.
     * @type {boolean}
     */
    export let dark = false;

    let highlightedCode = "";
    $: ({ default: component, name, highlighter } = language);
    $: if (highlighter) {
        HighlightJS.registerLanguage(name, highlighter);
        ({ value: highlightedCode } = HighlightJS.highlight(code, {
            language: name,
        }));
    } else {
        highlightedCode = code;
    }
</script>

<pre class="berry-code hljs" class:dark class:inline>
    <svelte:component this={component}>
        {@html highlightedCode}
    </svelte:component>
</pre>

<style>
    :export {
        --br-code-background-color: ;
        --br-code-text-color: ;
        --br-code-border-radius: ;
        --br-code-string-color: ;
        --br-code-comment-color: ;
        --br-code-white-space: ;
    }
    :theme(berry, dark) {
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
    :theme(berry, light) {
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
    [class^="language-"] {
        display: contents;
    }
    .inline {
        display: inline;
        padding: 0.6ch 1ch;
    }
</style>
