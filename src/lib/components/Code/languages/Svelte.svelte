<script context="module">
    import { highlighter as highlight_javascript } from "./JavaScript.svelte";
    import { highlighter as highlight_css } from "./CSS.svelte";
    import { highlighter as highlight_html } from "./HTML.svelte";

    // Adapted from https://github.com/AlexxNB/highlightjs-svelte
    export function highlighter(hljs) {
        hljs.registerLanguage("css", highlight_css);
        hljs.registerLanguage("javascript", highlight_javascript);
        hljs.registerLanguage("xml", highlight_html);
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
    };
</script>

<div class="language-svelte">
    <slot/>
</div>
