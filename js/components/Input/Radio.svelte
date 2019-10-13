<script>
    import Icon from './Icon.svelte'
    export let name = ''
    export let label = ''
    export let checked = false
    export let disabled = false
</script>

<svelte:options tag="sb-radio"/>

<label class="input-wrapper">
    <!-- svelte-ignore a11y-autofocus -->
    <input checked {disabled} {name} on:blur on:change on:input 
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