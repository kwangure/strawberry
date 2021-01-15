<script>
    import { getContext } from "svelte";
    import { radioGroup } from "./Group.svelte";
    import { createEventForwarder } from "../../../utils/forward-events.js";

    export let value;

    const forward = createEventForwarder();
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
    <input on:change={handleChange} type="radio" {value}
        use:forward name={group.name} {...$$restProps}>
    <slot name="label"/>
</label>

<style>
    @import "../css/checkboxRadio.css";
</style>