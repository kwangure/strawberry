// Adapted from https://github.com/AlexxNB/highlightjs-svelte
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";

export default function hljsDefineSvelte(hljs) {
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("xml", xml);
    return {
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
                begin: /^(\s*)(<style.*>)/gm,
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
                        begin: /[\{]/,
                        end: /[\}]/,
                        skip: true,
                    },
                    {
                        begin: /([#:\/@])(if|else|each|await|then|catch|debug|html)/gm,
                        className: "keyword",
                        relevance: 10,
                    },
                ],
            },
        ],
    };
}
