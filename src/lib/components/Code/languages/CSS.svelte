<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/css";
    export const name = "css";
</script>

<style>
    /* e.g `.class_name` */
    :global(.language-css .hljs-selector-class) {
        color: var(--br-code-css-class-color, var(--_vs_gold));
    }
    /* e.g `width:`, `--custom-property:` */
    :global(.language-css .hljs-attr) {
        color: var(--br-code-css-attribute-color, var(--_vs_blue_value));
    }
    /* e.g `50px` */
    :global(.language-css .hljs-number) {
        color: var(--br-code-css-number-color, var(--_vs_green_number));
    }
    /* e.g `var()`, `max()` */
    :global(.language-css .hljs-built_in) {
        color: var(--br-code-css-function-color, var(--_vs_yellow_function));
    }
</style>
