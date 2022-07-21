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
        height: var(--br-navbar-height);
        width: var(--br-navbar-width);
        border-bottom: var(--br-navbar-border-bottom);
        margin-block: var(--br-navbar-margin-block);
        margin-inline: var(--br-navbar-margin-inline);
        padding-block: var(--br-navbar-padding-block);
        padding-inline: var(--br-navbar-padding-inline);
    }
</style>
