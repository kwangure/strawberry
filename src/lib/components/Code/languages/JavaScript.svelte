<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/javascript";
    export const name = "javascript";
</script>

<style>
    /* e.g `if`, `else`, `import`, `default` */
    :global(.language-javascript .hljs-keyword) {
        color: var(--br-code-js-keyword-color, var(--_vs_purple_keyword));
    }
    /* e.g `@type` */
    :global(.language-javascript .hljs-doctag) {
        color: var(--br-code-js-doctag-color, var(--_vs_blue_name));
    }
    /* e.g `console`, `window`, `x` */
    :global(.language-javascript .hljs-variable) {
        color: var(--br-code-js-variable-color, var(--_vs_blue_value));
    }
    /* e.g `500` */
    :global(.language-javascript .hljs-number) {
        color: var(--br-code-js-number-color, var(--_vs_green_light));
    }
    /* e.g `Object`, `Number`, `String` */
    :global(.language-javascript .hljs-title.class_) {
        color: var(--br-code-js-class-color, var(--_vs_green_type));
    }
    /* e.g `{{}}` in JSDoc */
    :global(.language-javascript .hljs-type) {
        color: var(--br-code-js-type-color, var(--_vs_green_type));
    }
    /* e.g addEventListener() */
    :global(.language-javascript .hljs-title.function_) {
        color: var(--br-code-js-function-color, var(--_vs_yellow_function));
    }
</style>
