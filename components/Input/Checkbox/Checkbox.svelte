<script>
	import { checkboxGroup } from "./Group.svelte";
	import { createEventForwarder } from "../../../utils/forward-events.js";
	import { getContext } from "svelte";

	export let value;
	export let checked = false;

	const forward = createEventForwarder();
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

<label class="berry-input-checkbox input-wrapper">
    <input type='checkbox' use:forward {...$$restProps}>
    <slot name="label"/>
</label>

<style>
    @import "../css/checkboxRadio.css";
</style>