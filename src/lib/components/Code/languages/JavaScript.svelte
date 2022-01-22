<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/javascript";
    export const name = "javascript";
</script>

<style>
    /* e.g `if`, `else`, `import`, `default` */
    :global(.language-javascript .hljs-keyword) {
        color: var(--br-code-js-keyword-color, var(--_keyword_color));
    }
    /* e.g `@type` */
    :global(.language-javascript .hljs-doctag) {
        color: var(--br-code-js-doctag-color, var(--_name_color));
    }
    /* e.g `console`, `window`, `x` */
    :global(.language-javascript .hljs-variable) {
        color: var(--br-code-js-variable-color, var(--_value_color));
    }
    /* e.g `500` */
    :global(.language-javascript .hljs-number) {
        color: var(--br-code-js-number-color, var(--_number_color));
    }
    /* e.g `Object`, `Number`, `String` */
    :global(.language-javascript .hljs-title.class_) {
        color: var(--br-code-js-class-color, var(--_type_color));
    }
    /* e.g `{{}}` in JSDoc */
    :global(.language-javascript .hljs-type) {
        color: var(--br-code-js-type-color, var(--_type_color));
    }
    /* e.g `addEventListener()` */
    :global(.language-javascript .hljs-title.function_) {
        color: var(--br-code-js-function-color, var(--_function_color));
    }
    /* e.g `"string"` */
    :global(.language-javascript .hljs-string) {
        color: var(--br-code-js-string-color, var(--_string_color));
    }
    /* e.g `// this is a comment` */
    :global(.language-javascript .hljs-comment) {
        color: var(--br-code-js-comment-color, var(--_comment_color));
    }
</style>
