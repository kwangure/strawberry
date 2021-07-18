<script context="module">
    export const checkboxGroup = "berry-checkbox-group";
</script>
<script>
    import { setContext } from "svelte";

    export let group = [];

    setContext(checkboxGroup, {
        add: (value) => {
            group = [...group, value];
        },
        remove: (value) => {
            group = group.filter((v) => v === value);
        },
    });

    if (import.meta.DEV && !Array.isArray(group)) {
        console.error("'group' prop must be an Array");
    }
</script>

<slot/>