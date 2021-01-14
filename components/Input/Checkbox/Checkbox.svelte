<script>
	import { getContext } from "svelte";
	import { checkboxGroup } from "./Group.svelte";

	export let value;
	export let checked = false;

	const group = getContext(checkboxGroup);
	$: handleCheck(checked);

	function handleCheck(checked) {
	    if (!group) return;
	    if (checked) {
	        group.add(value);
	    } else {
	        group.remove(value);
	    }
	}
</script>

<label class="berry-input-checkbox input-wrapper" on:click>
    <input bind:checked on:blur on:input on:focus
        type='checkbox' {...$$restProps}>
    <slot name="label"/>
</label>

<style>
    @import "../css/checkboxRadio.css";
</style>