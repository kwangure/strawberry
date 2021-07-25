<script>
    import Checkbox from "~@components/Input/Checkbox";
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Input/Checkbox/docs";
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