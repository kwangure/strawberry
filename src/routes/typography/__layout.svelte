<script>
    import Layout from "../_layout.svelte";
</script>

<Layout>
    <div class="typography">
        <slot/>
    </div>
</Layout>

<style>
    .typography {
        padding: var(--br-item-block-padding) var(--br-item-inline-padding);
    }
</style>