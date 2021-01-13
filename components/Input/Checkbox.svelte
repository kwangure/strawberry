<script>
    import { focusElement } from "./actions";

    export let name = "";
    export let checked = false;
    export let disabled = false;
    export let focus = false;

    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`The 'label' slot must be included.`);
    }
</script>

<label class="berry-input-checkbox input-wrapper" on:click>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:checked {disabled} {name} on:blur on:change
        on:input on:focus type='checkbox' use:focusElement={focus}>
    <slot name="label"/>
</label>

<style>
    @import "./css/checkboxRadio.css";
</style>