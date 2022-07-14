<script>
    import Layout from '$lib/internal/layout.svelte';
</script>

<Layout>
    <div class="typography">
        <slot/>
    </div>
</Layout>

<style>
    .typography {
        padding: var(--br-item-padding-block) var(--br-item-padding-inline);
    }
</style>