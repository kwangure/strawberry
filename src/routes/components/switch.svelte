<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Switch/docs";
    import Switch from "~@components/Switch";

    let checked = true;
</script>

<Component docs="{docs}">
    <svelte:fragment slot="inline">
        <Switch bind:checked></Switch>
        {checked ? "": "un"}checked
    </svelte:fragment>
</Component>
