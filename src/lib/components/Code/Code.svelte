<script context="module">
    import highlight_css from "highlight.js/lib/languages/css";
    import highlight_javascript from "highlight.js/lib/languages/javascript";
    import highlight_xml from "highlight.js/lib/languages/xml";

    export const css = { name: "css", highlighter: highlight_css };
    export const javascript = { name: "js", highlighter: highlight_javascript };
    export const xml = { name: "xml", highlighter: highlight_xml };
    export const html = xml;

    // Adapted from https://github.com/AlexxNB/highlightjs-svelte
    export const svelte = {
        name: "svelte",
        highlighter(hljs) {
            hljs.registerLanguage("css", highlight_css);
            hljs.registerLanguage("javascript", highlight_javascript);
            hljs.registerLanguage("xml", highlight_xml);
            return {
                name: "svelte",
                subLanguage: "xml",
                contains: [
                    hljs.COMMENT("<!--", "-->", {
                        relevance: 10,
                    }),
                    {
                        begin: /^(\s*)(<script(\s*context="module")?>)/gm,
                        end: /^(\s*)(<\/script>)/gm,
                        subLanguage: "javascript",
                        excludeBegin: true,
                        excludeEnd: true,
                        contains: [
                            {
                                begin: /^(\s*)(\$:)/gm,
                                end: /(\s*)/gm,
                                className: "keyword",
                            },
                        ],
                    },
                    {
                        // Add a redundant `{1}` qualifier because Svelte compiler chokes
                        // I haven't filed a bug. I'm lazy. Please do before you delete this comment
                        begin: /^(\s*)(<st{1}yle.*>)/gm,
                        end: /^(\s*)(<\/style>)/gm,
                        subLanguage: "css",
                        excludeBegin: true,
                        excludeEnd: true,
                    },
                    {
                        begin: /\{/gm,
                        end: /\}/gm,
                        subLanguage: "javascript",
                        contains: [
                            {
                                begin: /[{]/,
                                end: /[}]/,
                                skip: true,
                            },
                            {
                                begin: /([#:/@])(if|else|each|await|then|catch|debug|html)/gm,
                                className: "keyword",
                                relevance: 10,
                            },
                        ],
                    },
                ],
            };
        },
    };

    export const docs = true;
</script>

<script>
    import "highlight.js/styles/github.css";
    import { HighlightJS } from "highlight.js/lib/core";

    /**
     * @template T
     * @typedef {{ name: T, highlighter: any }} Language<T>
     */

    /**
     * Which syntax highlighter to use.
     * @type {Language<"" | "css" | "html" | "javascript"> | "svelte" | "xml">}
    */
    export let language = "";

    export let code = "";
    /**
     * Whether to treat a codeblock as an inline element.
     * @type {boolean}
     */
    export let inline = false;

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

<pre class="berry-code" class:inline>
    {@html highlightedCode}
</pre>

<style>
    :export {
        --br-code-background: ;
        --br-code-border-radius: ;
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
