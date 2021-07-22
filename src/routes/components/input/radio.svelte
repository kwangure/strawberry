<script>
    import Radio, { Group } from "~@components/Input/Radio";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Input/Radio/docs";
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