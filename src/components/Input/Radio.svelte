<script>
    export let name = "";
    export let label = "";
    export let disabled = false;
    export let focus = false;

    let input = null;

    $: (focus && input) ? input.focus() : ""; 
</script>

<svelte:options tag="berry-input-radio"/>

<label class="berry-input-radio input-wrapper" on:click>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:this={input} checked {disabled} {name} on:blur on:change on:input 
        on:focus type="radio">
    {#if label}
        <span class="label">{ label }</span>
    {/if}
</label>

<style>
    .input-wrapper {
        display: inline-block;
        position: relative;
        line-height: inherit;
    }
    input {
        display: inline-block;
        line-height: 1.5;
        -webkit-transition: all .3s;
        transition: all .3s;
    }
    .label {
        margin-bottom: 5px;
    }
</style>