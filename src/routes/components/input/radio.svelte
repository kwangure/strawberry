<script>
    import Radio, { Group } from '$lib/components/input/radio';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/radio';
</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <Group>
            <Radio checked>
                <svelte:fragment slot="label">
                    Awesome label...<wbr>check!
                </svelte:fragment>
            </Radio>
            <Radio>
                <svelte:fragment slot="label">
                    Even better label...<wbr>check!
                </svelte:fragment>
            </Radio>
        </Group>
    </svelte:fragment>
</Component>