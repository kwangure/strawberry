<script>
    import "highlight.js/styles/github.css";
    import hljs from "highlight.js/lib/core";

    export let language;

    let highlightedCode = "";
    const highlighterPromise = loadHighlighter();

    async function loadHighlighter() {
        const highlighter = await import(`./languages/${language}.js`);
        hljs.registerLanguage(language, highlighter.default);
    }

    function highlight(code) {
        highlightedCode = hljs.highlight(code.textContent, {
            language,
        }).value;
    }
</script>

{#await highlighterPromise then _}
    <pre class="input" use:highlight>
        <slot/>
    </pre>
{/await}

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