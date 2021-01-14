<script context="module">
    export const radioGroup = "berry-radio-group";
</script>
<script>
    import { setContext } from "svelte";
    import uid from "uid";

    export let value = "";

    setContext(radioGroup, {
        set: (v) => value = v,
        name: uid(),
    });
</script>

<slot/>