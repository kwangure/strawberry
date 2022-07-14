<script>
    import { createEventForwarder } from '../../utils/forward-events.js';

    export let path = '';
    export let href = '';

    $: if (path) {
    	console.error('The \'path\' attribute has been depracated. Use the \'active\' prop to mark link active.');
    }

    /**
     * @type {boolean}
     */
    export let active = false;

    /**
     * @type {string | boolean | undefined}
     */
    export let download = undefined;

    $: active = href === path;

    const forward = createEventForwarder();
</script>

<a {href} class="menu-item" {download} use:forward class:active>
    <slot/>
</a>

<style>
    @import "./item.css";
    a {
        text-decoration: none;
        color: inherit;
    }
</style>

<script context="module">
    export const docs = true;
</script>
