<!--
    @component

    Hint informs a user the constraints of an input and whether the value of
    the input satisfies those constraints using a validation message.
-->
<script>
    import { getContext } from 'svelte';

    const validationMessageStore = getContext('validation-message');
</script>

<div class="hint" class:invalid={Boolean($validationMessageStore)}>
    <slot message={$validationMessageStore}>
        {$validationMessageStore}
    </slot>
</div>

<style>
    /* Adding margins to an empty container messes layout */
    div:not(:empty) {
        margin-block: var(--br-input-hint-margin-block);
        margin-inline: var(--br-input-hint-margin-inline);
        color: var(--br-input-hint-font-color);
        font-size: var(--br-input-hint-font-size);
    }
    /* Use pseudoselector to match '.hint' specificity */
    .invalid:not(:empty) {
        color: var(--br-input-hint-invalid-font-color);
    }
</style>