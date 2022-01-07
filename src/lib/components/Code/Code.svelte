<script>
    import "highlight.js/styles/github.css";
    import { tick as forceRerender } from "svelte";
    import { HighlightJS } from "highlight.js/lib/core";

    /**
     * Which syntax highlighter to use.
     * @type {"" | "css"| "javascript" | "svelte"}
    */
    export let language = "";
    /**
     * Whether to treat a codeblock as an inline element.
     * @type {boolean}
     */
    export let inline = false;

    let highlightedCode = "";

    async function highlight({ textContent: code }) {
        highlightedCode = code;
        forceRerender();
        if (!language) return;
        const highlighter = (await import(`./languages/${language}.js`)).default;
        HighlightJS.registerLanguage(language, highlighter);
        highlightedCode = HighlightJS.highlight(code, { language }).value;
    }
</script>

<pre class="input" use:highlight>
    <slot/>
</pre>

<pre class="berry-code" class:inline>
    {@html highlightedCode}
</pre>

<style>
    :export {
        --br-code-background: ;
        --br-code-border-radius: ;
    }
    .input {
        display: none;
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
    .inline {
        display: inline;
        padding: 0.6ch 1ch;
    }
</style>

<script context="module">
    export const docs = true;
</script>