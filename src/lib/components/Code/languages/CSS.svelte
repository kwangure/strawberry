<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/css";
    export const name = "css";
</script>

<div class="language-css">
    <slot></slot>
</div>

<style>
    /* e.g `.class_name` */
    :global(.language-css .hljs-selector-class) {
        color: var(--br-code-css-class-color, var(--_classname-color));
    }
    /* e.g `width:`, `--custom-property:` */
    :global(.language-css .hljs-attr) {
        color: var(--br-code-css-attribute-color, var(--_value-color));
    }
    /* e.g `50px` */
    :global(.language-css .hljs-number) {
        color: var(--br-code-css-number-color, var(--_number-color));
    }
    /* e.g `var()`, `max()` */
    :global(.language-css .hljs-built_in) {
        color: var(--br-code-css-function-color, var(--_function-color));
    }
    /* e.g `/* This is an escaped comment *\/` */
    :global(.language-css .hljs-comment) {
        color: var(--br-code-css-comment-color, var(--_comment-color));
    }
</style>
