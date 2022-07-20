<!--
    @component

    Sidebar provides composable side navigation, with support for nested views.
-->
<aside>
    <slot/>
</aside>

<style>
    aside {
        width: var(--br-sidebar-width);
        padding-block: var(--br-sidebar-padding-block);
        padding-inline: var(--br-sidebar-padding-inline);
        height: var(--br-sidebar-height);
        display: flex;
        flex-direction: column;
        user-select: none;
        gap: var(--br-sidebar-gap);
    }
</style>
