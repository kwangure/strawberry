<script>
    import uid from 'uid';

    const descriptionId = uid();
    const inputId = uid();

    let validationMessage = '';

    /**
     * @param {Event} event
     */
    function updateValidationMessage(event) {
    	validationMessage = /** @type {HTMLInputElement}*/(event?.target)?.validationMessage || '';
    }
</script>

<div class="wrapper" class:active={$$slots.label || $$slots.hint}>
    <slot name='label'></slot>
    <div class="container" on:validate={updateValidationMessage}>
        <slot {descriptionId} {inputId} {validationMessage}/>
    </div>
    <slot name='hint' ></slot>
</div>

<style>
    .wrapper {
        display: contents;
    }
    .active {
        display: inline-block;
    }
    .container {
        display: flex;
        border: var(--br-input-container-border);
        border-radius: var(--br-input-container-border-radius);
        background-color: var(--br-input-container-background-color);
        height: var(--br-input-container-height);
        transition: var(--br-input-container-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-input-container-hover-box-shadow);
        border: var(--br-input-container-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-input-container-focus-box-shadow);
        border: var(--br-input-container-focus-border);
    }
</style>