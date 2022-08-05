<!--
    @component

    Hint informs a user the constraints of an input and whether the value of
    the input satisfies those constraints using a validation message.
-->
<script>
    /**
     * @type {any}
     */
    export let invalid = false;
</script>

<div class="hint" class:invalid>
    <slot/>
</div>

<style>
    /* Adding margins to an empty container messes layout */
    div:not(:empty) {
        margin-block: var(--br-input-hint-root-margin-block);
        margin-inline: var(--br-input-hint-root-margin-inline);
        color: var(--br-input-hint-root-font-color);
        font-size: var(--br-input-hint-root-font-size);
    }
    div.invalid:not(:empty) {
        color: var(--br-input-hint-root-invalid-font-color);
    }
</style>