<script context="module">
    export const radioGroup = 'berry-radio-group';
    export const docs = true;
</script>
<script>
    import { setContext } from 'svelte';
    import uid from 'uid';

    export let value = '';

    setContext(radioGroup, {
    	set: (v) => {
    		value = v;
    		return v;
    	},
    	name: uid(),
    	initialValue: value,
    });
</script>

<slot/>