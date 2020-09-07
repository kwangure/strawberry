<script>
    export let name = "";
    export let label;
    export let disabled = false;
    export let focus = false;

    let input = null;

    if (import.meta.env.DEV) {
        const isEmpty = (str) => (!str || 0 === str.length);
        isEmpty(label) && console.error(`The 'label' prop must be included.`);
    }

    $: (focus && input) ? input.focus() : "";
</script>

<label class="berry-input-radio input-wrapper" on:click>
    <!-- svelte-ignore a11y-autofocus -->
    <input bind:this={input} checked {disabled} {name} on:blur on:change on:input 
        on:focus type="radio">
    <span>{ label }</span>
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
    }
</style>