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
    @media (prefers-color-scheme: dark) {
        .contents {
            --br-button-font-color: #fff;
            --br-button-background-color: hsl(225deg 100% 60%);
            --br-button-hover-background-color: hsl(225deg 100% 45%);
            --br-button-border-color: var(--br-button-background-color);
            --br-button-hover-border-color: var(--br-button-hover-background-color);
        }
    }
    @media (prefers-color-scheme: light) {
        .contents {
            --br-button-font-color: #fff;
            --br-button-background-color: hsl(225deg 100% 55%);
            --br-button-hover-background-color: hsl(225deg 100% 45%);
            --br-button-border-color: var(--br-button-background-color);
            --br-button-hover-border-color: var(--br-button-hover-background-color);
        }
    }
</style>