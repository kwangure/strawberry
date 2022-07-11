<script>
    import Component from "$lib/internal/component.svelte";
    import DateTime from "$lib/components/input/datetime";
    import { docs } from "$lib/components/input/datetime/docs";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <DateTime value="2017-06-01T01:00">
            <svelte:fragment slot="label">
                This is a datetime label
            </svelte:fragment>
        </DateTime>
    </svelte:fragment>
</Component>