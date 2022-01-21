<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/xml";
    export const name = "html";
</script>

<style>
    /* e.g <body>, <table>  */
    :global(.language-xml .hljs-tag) {
        color: var(--br-code-html-tag, var(--_vs_blue_name));
    }
    /* e.g `class` `type` */
    :global(.language-xml .hljs-attr) {
        color: var(--br-code-html-attribute, var(--_vs_blue_value));
    }
</style>
