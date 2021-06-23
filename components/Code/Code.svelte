<script>
    import "highlight.js/styles/github.css";
    import { escape } from "html-escaper";
    import { tick as forceRerender } from "svelte";
    import hljs from "highlight.js/lib/core";

    export let language;

    let highlightedCode = "";

    function highlight({ textContent: code }) {
        highlightedCode = escape(code);
        forceRerender();
        import(`./languages/${language}.js`)
            .then((highlighter) => {
                hljs.registerLanguage(language, highlighter.default);
                highlightedCode = hljs.highlight(code, {
                    language,
                }).value;
            });
    }
</script>

<pre class="input" use:highlight>
    <slot/>
</pre>

<pre>
    {@html highlightedCode}
</pre>

<style>
    pre.input {
        display: none;
    }
    pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: var(--br-grey-lightest);
        border-radius: var(--br-border-radius);
        margin: 0;
    }
</style>