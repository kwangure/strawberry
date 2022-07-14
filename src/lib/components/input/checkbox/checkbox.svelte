<script context="module">
    export const docs = true;
</script>

<script>
	import '../../../css/styles.js';
	import { checkboxGroup } from './group.svelte';
	import { createEventForwarder } from '../../../utils/forward-events.js';
	import { getContext } from 'svelte';

	/**
     * The value of the component if checked.
     * @type {string}
     */
	export let value;
	/**
	 * Whether the command or control is checked
	 *
	 * @type {boolean}
	 */
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

<label class="input-wrapper">
    <input type='checkbox' {value} bind:checked use:forward {...$$restProps}>
    <slot name="label"/>
</label>

<style>
    @import "../css/checkboxRadio.css";
</style>
