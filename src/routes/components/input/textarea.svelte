<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Input/Textarea/docs";
    import Textarea from "~@components/Input/Textarea";
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Textarea placeholder="I can say anything!">
            <svelte:fragment slot="label">
                I label inputs like no one else!
            </svelte:fragment>
        </Textarea>
    </svelte:fragment>
</Component>
