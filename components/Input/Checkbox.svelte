<script>
    export let name = "";
    export let label = "";
    export let checked = false;
    export let disabled = false;
    export let focus = false;

    let input = null;

    if (import.meta.env.DEV) {
        const isEmpty = (str) => (!str || 0 === str.length);
        isEmpty(label) && !$$slots.label && console.error(`The 'label' prop must be included.`);
    }

    $: (focus && input) ? input.focus() : "";
</script>

<label class="berry-input-checkbox input-wrapper" on:click>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:checked bind:this={input} {disabled} {name} on:blur on:change
        on:input on:focus type='checkbox'>
    {#if $$slots.label}
        <slot name="label"/>
    {:else}
        <span>{ label }</span>
    {/if}
</label>

<style>
    @import "./css/checkboxRadio.css";
</style>