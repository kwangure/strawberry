<script>
    import Component from "$lib/internal/component.svelte";
    import DateTime from "$lib/components/Input/DateTime";
    import { docs } from "$lib/components/Input/DateTime/docs";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <DateTime value="2017-06-01">
            <svelte:fragment slot="label">
                This is a datetime label
            </svelte:fragment>
        </DateTime>
    </svelte:fragment>
</Component>