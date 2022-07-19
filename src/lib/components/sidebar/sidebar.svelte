<!--
    @component

    Sidebar provides composable side navigation, with support for nested views.
-->
<script>
    import '../../css/styles.js';
</script>

<!-- TODO: Use <aside/> -->
<div class="berry-sidebar">
    <slot/>
</div>

<style>
    /* TODO: make sidebar styles configurable */
    .berry-sidebar {
        width: 240px;
        padding: var(--br-outer-gutter);
        height: 100%;
        display: flex;
        flex-direction: column;
        user-select: none;
        gap: var(--br-inner-gutter);
    }
</style>
