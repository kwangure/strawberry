<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/xml";
    export const name = "xml";
</script>

<div class="language-xml">
    <slot/>
</div>

<style>
    /* e.g `<body>`, `<table>` */
    :global(.language-xml .hljs-tag) {
        color: var(--br-code-html-tag-color, var(--_name-color));
    }
    /* e.g `class` `type` */
    :global(.language-xml .hljs-attr) {
        color: var(--br-code-html-attribute-color, var(--_value-color));
    }
    /* e.g `"string"` */
    :global(.language-xml .hljs-string) {
        color: var(--br-code-html-string-color, var(--_string-color));
    }
    /* e.g `<!-- This is a comment -->` */
    :global(.language-xml .hljs-comment) {
        color: var(--br-code-html-comment-color, var(--_comment-color));
    }
</style>
