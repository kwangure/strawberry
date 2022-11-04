<div class="container">
    <slot/>
</div>

<style>
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