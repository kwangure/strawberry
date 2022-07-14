<script context="module">
    export const docs = true;
</script>

<script>
    import '../../../css/styles.js';
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import { getContext } from 'svelte';
    import { radioGroup } from './group.svelte';

    /**
     * The value of the component if checked.
     * @type {string}
     */
    export let value;

    const forward = createEventForwarder();
    const group = getContext(radioGroup);

    if (import.meta.env.DEV && !group) {
    	throw Error('\'Radio\' must be wrapped in a radio \'Group\' parent.');
    }

    function handleChange() {
    	// eslint-disable-next-line no-invalid-this
    	if (this.checked) {
    		group.set(value);
    	}
    }
</script>

<label class="input-wrapper">
    <input on:change={handleChange} type="radio" {value}
        use:forward name={group.name} {...$$restProps}
        checked={group.initialValue === value}>
    <slot name="label"/>
</label>

<style>
    @import "../css/checkboxRadio.css";
</style>
