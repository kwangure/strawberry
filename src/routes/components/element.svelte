<script>
    import Component from "$lib/internal/component.svelte";
    import { docs } from "~@components/Element/docs";
    import Element from "~@components/Element";

    const element = {
        type: "p",
        attributes: {
            style: "font-style: italic; font-weight: 700;",
        },
        children: "I am a dynamically generated purple <p/> tag element.",
    };
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Element {element}/>
    </svelte:fragment>
</Component>