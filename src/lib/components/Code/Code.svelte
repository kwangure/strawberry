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

    export let code = "";
    /**
     * Whether to treat a codeblock as an inline element.
     * @type {boolean}
     */
    export let inline = false;

    let highlightedCode = "";
    $: if (language) {
        const { name, highlighter } = language;
        HighlightJS.registerLanguage(undefined, language.highlighter);
        ({ value: highlightedCode } = HighlightJS.highlight(code, {
            language: name,
        }));
    } else {
        highlightedCode = code;
    }
</script>

<pre class="berry-code hljs" class:inline>
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
    }
    pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: var(--br-code-background, var(--br-grey-lightest));
        border-radius: var(--br-code-border-radius, var(--br-border-radius));
        margin: 0;
    }
    pre :global([class^="language-"]) {
        --_vs_blue_name: #569cd6;
        --_vs_blue_value: #9cdcfe;
        --_vs_brown_string: #d69d85;
        --_vs_gold: #d7ba7d;
        --_vs_green_comment: #6a9955;
        --_vs_green_number: #b5cea8;
        --_vs_green_type: #4ec9b0;
        --_vs_yellow_function: #dcdcaa;
        --_vs_purple_keyword: #c586c0;
    }
    [class^="language-"] {
        display: contents;
    }
    .inline {
        display: inline;
        padding: 0.6ch 1ch;
    }
    .hljs {
        background: #1e1e1e;
        color: #dcdcdc;
    }
    pre :global(.hljs-string) {
        color: var(--br-code-string-color, var(--_vs_brown_string));
    }
    pre :global(.hljs-comment) {
        color: var(--br-code-comment-color, var(--_vs_green_comment));
    }
</style>
