<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/input/text/docs";
    import Input from "~@components/input/text";
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
