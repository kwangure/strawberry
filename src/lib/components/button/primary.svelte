<!--
    @component

    Primary enhances the default button. Use it to call attention to an action
    on a form or to highlight the strongest call to action on a page. Primary
    buttons should only appear once per container.

    Not every screen requires a primary button.
-->
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