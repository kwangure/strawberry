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
        padding: 8px 12px;
    }
</style>