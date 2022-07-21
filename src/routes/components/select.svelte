<script>
    import Select, { Option } from '$lib/components/input/select';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/select';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Select placeholder="Like I said...">
            <svelte:fragment slot="label">I label selects.</svelte:fragment>
            <Option value={'onion'}>Undercover Onion</Option>
            <Option value={'testicle'}>Testicle Rainbow</Option>
        </Select>
    </svelte:fragment>
</Component>
