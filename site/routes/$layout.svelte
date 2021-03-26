<script>
    import "~@css/common.css";
import "~@css/standardDOM.css";

    import Nav from "./__layout.svelte/Nav.svelte";
</script>

<div class="app-layout">
    <Nav/>
    <slot></slot>
</div>

<style>
    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }
</style>
