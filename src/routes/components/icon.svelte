<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Icon/docs";
    import Icon from "~@components/Icon";
    import { mdiPencil } from "@mdi/js";

</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Icon path={mdiPencil}/>
    </svelte:fragment>
</Component>