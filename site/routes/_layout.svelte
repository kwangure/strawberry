<script>
    import "$css/standardDOM";
    import Nav from "./__layout.svelte/Nav.svelte";
</script>

<div class="app-layout">
    <Nav on:navigate/>
    <slot></slot>
</div>

<style>
    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }
</style>
