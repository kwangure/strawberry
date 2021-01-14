<script>
    import { getContext } from "svelte";
    import { radioGroup } from "./Group.svelte";

    export let value;

    const group = getContext(radioGroup);
    if (import.meta.env.DEV && !group) {
        throw Error(`'Radio' must be wrapped in a radio 'Group' parent.`);
    }

    function handleChange() {
        if (this.checked) {
            group.set(value);
        }
    }
</script>

<label class="berry-input-radio input-wrapper">
    <input on:change
        on:blur on:change={handleChange} on:input
        on:focus type="radio" {value} name={group.name}>
    <slot name="label"/>
</label>

<style>
    @import "../css/checkboxRadio.css";
</style>