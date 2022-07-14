<script>
    import '../../css/styles.js';
</script>

<div class="berry-sidebar">
    <slot/>
</div>

<style>
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

<script context="module">
    export const docs = true;
</script>
