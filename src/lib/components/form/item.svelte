<script>
    import uid from 'uid';

    const descriptionId = uid();
    const inputId = uid();
</script>

<div>
    <slot {descriptionId} {inputId}/>
</div>

<style>
    div {
        display: var(--br-form-item-display);
        width: var(--br-form-item-width);
        height: var(--br-form-item-height);
        margin-block: var(--br-form-item-margin-block);
        margin-inline: var(--br-form-item-margin-inline);
    }
</style>