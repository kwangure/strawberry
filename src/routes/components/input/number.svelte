<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Input/Number/docs";
    import Numero from "~@components/Input/Number";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Numero placeholder="Use keyboard or UI arrows!">
            <svelte:fragment slot="label">
                Mi label numeros!
            </svelte:fragment>
        </Numero>
    </svelte:fragment>
</Component>