<script>
    import Component from '$lib/internal/component.svelte';
    import Date from '$lib/components/input/date';
    import { docs } from '$lib/components/input/date/docs';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Date value="2017-06-01">
            <svelte:fragment slot="label">
                This is a date label
            </svelte:fragment>
        </Date>
    </svelte:fragment>
</Component>