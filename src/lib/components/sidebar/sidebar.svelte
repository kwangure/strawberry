<!--
    @component

    Sidebar provides composable side navigation, with support for nested views.
-->
<aside>
    <slot/>
</aside>

<style>
    aside {
        width: var(--br-sidebar-root-width);
        padding-block: var(--br-sidebar-root-padding-block);
        padding-inline: var(--br-sidebar-root-padding-inline);
        height: var(--br-sidebar-root-height);
        display: flex;
        flex-direction: column;
        user-select: none;
        gap: var(--br-sidebar-root-gap);
    }
</style>
