<script>
    import { focusElement } from "./actions";

    export let name = "";
    export let label = "";
    export let checked = false;
    export let disabled = false;
    export let focus = false;

    if (import.meta.env.DEV) {
        const isEmpty = (str) => (!str || 0 === str.length);
        isEmpty(label) && !$$slots.label && console.error(`The 'label' prop must be included.`);
    }
</script>

<label class="berry-input-checkbox input-wrapper" on:click>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:checked {disabled} {name} on:blur on:change
        on:input on:focus type='checkbox' use:focusElement={focus}>
    {#if $$slots.label}
        <slot name="label"/>
    {:else}
        <span>{ label }</span>
    {/if}
</label>

<style>
    @import "./css/checkboxRadio.css";
</style>