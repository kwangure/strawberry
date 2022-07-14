<script>
    import '../../../css/styles.js';
    import { createEventForwarder } from '../../../utils/forward-events.js';
    import { slide } from 'svelte/transition';

    /**
     * The initial value of the component.
     * @type {string | undefined}
     */
    export let value = '';
    /**
     * Whether the input is focused.
     *
     * @type {boolean}
     */
    export let focus = false;
    export let invalid = () => false;

    const forward = createEventForwarder();

    let textarea = null;
    let blurred = false;

    $: if (focus && textarea) textarea.focus();
    $: isInvalid = blurred && invalid(value);

    function autosize() {
    	const computed = getComputedStyle(textarea);

    	let newHeight;
    	newHeight = parseInt(computed.getPropertyValue('border-top-width'));
    	newHeight += parseInt(computed.getPropertyValue('border-bottom-width'));

    	newHeight += textarea.scrollHeight;
    	textarea.style.height = `${newHeight}px`;
    }
</script>

<!--
	Svelte a11y check doesn't check nested labels-input pairs 🙄
 	See https://github.com/sveltejs/svelte/issues/5300
-->
<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
    <div class="label-text">
        <slot name="label"/>
    </div>
    <textarea class="text-input" class:is_invalid={isInvalid}
        bind:this={textarea} on:input={autosize}
        on:blur={() => blurred = true}
        use:forward bind:value {...$$restProps}/>
    {#if isInvalid}
    <div class="invalid" transition:slide>
        {isInvalid}
    </div>
    {/if}
</label>

<style>
    @import "../css/input.css";
    @import "../css/container.css";

    label {
        display: inline-block;
    }
    /* TODO: style label only when div is not empty */
    .label-text {
        margin-block: var(--br-textarea-label-margin-block);
        position: var(--br-textarea-label-position);
        height: var(--br-textarea-label-height);
        width: var(--br-textarea-label-width);
        overflow: var(--br-textarea-label-overflow);
    }
    textarea {
        padding-block: var(--br-input-textarea-padding-block);
        padding-inline: var(--br-input-textarea-padding-inline);
    }
    textarea.text-input {
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none;
        scrollbar-width: none;
        border: var(--br-textarea-border);
        border-color: var(--br-textarea-border-color);
        border-radius: var(--br-textarea-border-radius);
    }
    textarea::-webkit-scrollbar {
        display: none;
    }
    textarea:hover:not(:focus) {
        box-shadow: 0 0 0px 2px var(--_container-box-shadow-color);
        border-color: var(--_container-border-color);
    }
    textarea:focus {
        border: 2px solid var(--br-primary);
        padding: calc(var(--br-input-padding-block, 5px) - 1px) calc(var(--br-input-padding-inline, 12px) - 1px);
    }
</style>

<script context="module">
    export const docs = true;
</script>
