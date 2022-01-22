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
    pre.dark {
        background-color: #1e1e1e;
        color: #dcdcdc;
    }
    pre :global([class^="language-"]) {
        --_name_color: #0021b3;
        --_string_color: #be6404;
        --_value_color: #037e0b;
        --_classname_color: #c79e09;
        --_comment_color: #2f9d62;
        --_number_color: #085ad6;
        --_type_color: #cf222e;
        --_function_color: #0021b3;
        --_keyword_color: #c123b4;
    }
    pre.dark :global([class^="language-"]) {
        --_name_color: #569cd6;
        --_string_color: #d69d85;
        --_value_color: #9cdcfe;
        --_classname_color: #d7ba7d;
        --_comment_color: #6a9955;
        --_number_color: #b5cea8;
        --_type_color: #4ec9b0;
        --_function_color: #dcdcaa;
        --_keyword_color: #c586c0;
    }
    [class^="language-"] {
        display: contents;
    }
    .inline {
        display: inline;
        padding: 0.6ch 1ch;
    }
</style>
