<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Switch/docs";
    import Switch from "~@components/Switch";
</script>

<Component docs="{docs}">
    <svelte:fragment slot="inline">
        <Switch></Switch>
    </svelte:fragment>
</Component>
