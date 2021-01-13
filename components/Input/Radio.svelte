<script>
    import { focusElement } from "./actions";

    export let name = "";
    export let disabled = false;
    export let focus = false;
    export let group;
    export let value;

    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`The 'label' slot must be included.`);
    }
</script>

<label class="berry-input-radio input-wrapper" on:click>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:group {disabled} {name} on:blur on:change on:input
        on:focus type="radio" {value} use:focusElement={focus}>
    <slot name="label"/>
</label>

<style>
    @import "./css/checkboxRadio.css";
</style>