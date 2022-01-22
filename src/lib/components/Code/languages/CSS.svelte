<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/css";
    export const name = "css";
</script>

<style>
    /* e.g `.class_name` */
    :global(.language-css .hljs-selector-class) {
        color: var(--br-code-css-class-color, var(--_classname_color));
    }
    /* e.g `width:`, `--custom-property:` */
    :global(.language-css .hljs-attr) {
        color: var(--br-code-css-attribute-color, var(--_value_color));
    }
    /* e.g `50px` */
    :global(.language-css .hljs-number) {
        color: var(--br-code-css-number-color, var(--_number_color));
    }
    /* e.g `var()`, `max()` */
    :global(.language-css .hljs-built_in) {
        color: var(--br-code-css-function-color, var(--_function_color));
    }
    /* e.g `/* This is an escaped comment *\/` */
    :global(.language-xml .hljs-comment) {
        color: var(--br-code-html-comment-color, var(--_comment_color));
    }
</style>
