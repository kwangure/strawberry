<script context="module">
    export { default as highlighter } from "highlight.js/lib/languages/javascript";
    export const name = "javascript";
</script>

<div class="language-javascript">
    <slot/>
</div>

<style>
    /* e.g `if`, `else`, `import`, `default` */
    .language-javascript :global(.hljs-keyword) {
        color: var(--br-code-js-keyword-color, var(--_keyword-color));
    }
    /* e.g `@type` */
    .language-javascript :global(.hljs-doctag) {
        color: var(--br-code-js-doctag-color, var(--_name-color));
    }
    /* e.g `console`, `window`, `x` */
    .language-javascript :global(.hljs-variable) {
        color: var(--br-code-js-variable-color, var(--_value-color));
    }
    /* e.g `500` */
    .language-javascript :global(.hljs-number) {
        color: var(--br-code-js-number-color, var(--_number-color));
    }
    /* e.g `Object`, `Number`, `String` */
    .language-javascript :global(.hljs-title.class_) {
        color: var(--br-code-js-class-color, var(--_type-color));
    }
    /* e.g `{{}}` in JSDoc */
    .language-javascript :global(.hljs-type) {
        color: var(--br-code-js-type-color, var(--_type-color));
    }
    /* e.g `addEventListener()` */
    .language-javascript :global(.hljs-title.function_) {
        color: var(--br-code-js-function-color, var(--_function-color));
    }
    /* e.g `"string"` */
    .language-javascript :global(.hljs-string) {
        color: var(--br-code-js-string-color, var(--_string-color));
    }
    /* e.g `// this is a comment` */
    .language-javascript :global(.hljs-comment) {
        color: var(--br-code-js-comment-color, var(--_comment-color));
    }
</style>
