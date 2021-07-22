<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Input/Text/docs";
    import Input from "~@components/Input/Text";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Input placeholder="I can say anything!">
            <svelte:fragment slot="label">
                I label inputs like no one else!
            </svelte:fragment>
        </Input>
    </svelte:fragment>
</Component>
