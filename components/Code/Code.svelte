<script>
    import "highlight.js/styles/github.css";
    import { escape } from "html-escaper";
    import { tick as forceRerender } from "svelte";
    import hljs from "highlight.js/lib/core";
    import loadHighlighter from "./loader.js";

    /**
     * Which syntax highlighter to use.
     * @type {"" | "javascript" | "svelte"}
    */
    export let language = "";
    /**
     * Whether to treat a codeblock as an inline element.
     * @type {boolean}
     */
    export let inline = false;

    let highlightedCode = "";

    function highlight({ textContent: code }) {
        highlightedCode = escape(code);
        forceRerender();
        if (!language) return;
        loadHighlighter(language)
            .then((highlighter) => {
                hljs.registerLanguage(language, highlighter);
                highlightedCode = hljs.highlight(code, {
                    language,
                }).value;
            });
    }
</script>

<pre class="input" use:highlight>
    <slot/>
</pre>

<pre class="berry-code" class:inline>
    {@html highlightedCode}
</pre>

<style>
    .berry-code {
        --br-code-background: var(--br-grey-lightest);
    }
    .input {
        display: none;
    }
    pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: var(--br-code-background);
        border-radius: var(--br-border-radius);
        margin: 0;
    }
    .inline {
        display: inline;
        padding: 0.6ch 1ch;
    }
</style>