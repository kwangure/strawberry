<!-- TODO: Add a component description here. See button for example -->
<div class="contents">
    <slot/>
</div>

<style>
    .contents {
        display: contents;
    }
    .contents {
        --br-button-font-color: #fff;
        --br-button-background-color: var(--br-primary);
        --br-button-hover-background-color: var(--br-primary-hover);
        --br-button-border-color: var(--br-primary);
    }
</style>