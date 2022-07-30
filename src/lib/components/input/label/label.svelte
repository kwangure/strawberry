<!-- svelte-ignore a11y-label-has-associated-control-->
<label>
    <div class="label-text">
        <slot/>
    </div>
    <slot name='input'/>
    <slot name='hint'/>
</label>

<style>
    label {
        display: inline-block;
        width: var(--br-input-label-root-width);
    }
    .label-text:not(:empty) {
        margin-block: var(--br-input-label-root-margin-block);
        position: var(--br-input-label-root-position);
        height: var(--br-input-label-root-height);
        width: var(--br-input-label-root-width);
        overflow: var(--br-input-label-root-overflow);
    }
</style>