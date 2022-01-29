<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/xml";
    export const name = "xml";
</script>

<div class="language-xml">
    <slot/>
</div>

<style>
    /* e.g `<body>`, `<table>` */
    .language-xml :global(.hljs-tag) {
        color: var(--br-code-html-tag-color, var(--_name-color));
    }
    /* e.g `class` `type` */
    .language-xml :global(.hljs-attr) {
        color: var(--br-code-html-attribute-color, var(--_value-color));
    }
    /* e.g `"string"` */
    .language-xml :global(.hljs-string) {
        color: var(--br-code-html-string-color, var(--_string-color));
    }
    /* e.g `<!-- This is a comment -->` */
    .language-xml :global(.hljs-comment) {
        color: var(--br-code-html-comment-color, var(--_comment-color));
    }
</style>
