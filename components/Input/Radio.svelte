<script>
    import { focusElement } from "./actions";

    export let name = "";
    export let disabled = false;
    export let focus = false;
    export let group = "";
    export let value = "";

    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`The 'label' slot must be included.`);
    }
</script>

<label class="berry-input-radio input-wrapper" on:click>
    <input bind:group checked={group === value} {disabled} {name}
        on:blur on:change={() => group = value} on:input
        on:focus type="radio" {value} use:focusElement={focus}>
    <slot name="label"/>
</label>

<style>
    @import "./css/checkboxRadio.css";
</style>