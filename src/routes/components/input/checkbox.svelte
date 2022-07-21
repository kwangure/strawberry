<script>
    import Checkbox from '$lib/components/input/checkbox';
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/checkbox';
</script>

<Component {docs}>
    <svelte:fragment slot="block">
        <Checkbox>
            <svelte:fragment slot="label">
                Awesome label...<wbr>check!
            </svelte:fragment>
        </Checkbox>
        <Checkbox>
            <svelte:fragment slot="label">
                Even awesomer label...<wbr>check!
            </svelte:fragment>
        </Checkbox>
    </svelte:fragment>
</Component>