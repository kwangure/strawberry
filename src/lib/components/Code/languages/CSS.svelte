<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/css";
    export const name = "css";
</script>

<div class="language-css">
    <slot></slot>
</div>

<style>
    /* e.g `.class_name` */
    .language-css :global(.hljs-selector-class) {
        color: var(--br-code-css-class-color, var(--_classname-color));
    }
    /* e.g `width:`, `--custom-property:` */
    .language-css :global(.hljs-attr) {
        color: var(--br-code-css-attribute-color, var(--_value-color));
    }
    /* e.g `50px` */
    .language-css :global(.hljs-number) {
        color: var(--br-code-css-number-color, var(--_number-color));
    }
    /* e.g `var()`, `max()` */
    .language-css :global(.hljs-built_in) {
        color: var(--br-code-css-function-color, var(--_function-color));
    }
    /* e.g `/* This is an escaped comment *\/` */
    .language-css :global(.hljs-comment) {
        color: var(--br-code-css-comment-color, var(--_comment-color));
    }
</style>
