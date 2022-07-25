<!--
    @component

    Navbar a collection of links for navigating websites.
-->
<nav>
    <slot/>
</nav>

<style>
    nav {
        display: flex;
        height: var(--br-navbar-root-height);
        width: var(--br-navbar-root-width);
        border-bottom: var(--br-navbar-root-border-bottom);
        margin-block: var(--br-navbar-root-margin-block);
        margin-inline: var(--br-navbar-root-margin-inline);
        padding-block: var(--br-navbar-root-padding-block);
        padding-inline: var(--br-navbar-root-padding-inline);
    }
</style>
