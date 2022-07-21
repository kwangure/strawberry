<script>
    export let href = '';
</script>

<a href={href}>
    <slot/>
</a>

<style>
    a {
        padding-inline: var(--br-navbar-logo-padding-inline);
        width: var(--br-navbar-logo-width);
        line-height: var(--br-navbar-height);
    }
</style>