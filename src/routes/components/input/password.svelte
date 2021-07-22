<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Input/Password/docs";
    import Password from "~@components/Input/Password";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Password placeholder="I can say anything!">
            <svelte:fragment slot="label">
                I label secrets!
            </svelte:fragment>
        </Password>
    </svelte:fragment>
</Component>