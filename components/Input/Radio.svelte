<script>
    export let name = "";
    export let label = "";
    export let disabled = false;
    export let focus = false;
    export let group;
    export let value;

    let input = null;

    if (import.meta.env.DEV) {
        const isEmpty = (str) => (!str || 0 === str.length);
        isEmpty(label) && !$$slots.label && console.error(`The 'label' prop must be included.`);
    }

    $: (focus && input) ? input.focus() : "";
</script>

<label class="berry-input-radio input-wrapper" on:click>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:this={input} bind:group {disabled} {name} on:blur on:change on:input 
        on:focus type="radio" {value}>
    {#if $$slots.label}
        <slot name="label"/>
    {:else}
        <span>{ label }</span>
    {/if}
</label>

<style>
    @import "./css/checkboxRadio.css";
</style>