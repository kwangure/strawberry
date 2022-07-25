<!--
    @component

    Textarea is a multi-line plain-text editing control. It allows users to
    enter a sizeable amount of free-form text, such as a comment on a review
    or feedback form.
-->
<script>
    import { createEventForwarder } from '../../../utils/forward-events.js';

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
    <textarea class="text-input container" class:is_invalid={isInvalid}
        bind:this={textarea} on:input={autosize}
        on:blur={() => blurred = true}
        use:forward bind:value {...$$restProps}/>
    <slot name="hint"></slot>
</label>

<style>
    label {
        display: inline-block;
        width: var(--br-textarea-root-width);
    }
    .label-text:not(:empty) {
        margin-block: var(--br-textarea-root-label-margin-block);
        position: var(--br-textarea-root-label-position);
        height: var(--br-textarea-root-label-height);
        width: var(--br-textarea-root-label-width);
        overflow: var(--br-textarea-root-label-overflow);
    }
    textarea {
        border: none;
        outline: 0;
        padding-block: var(--br-textarea-root-padding-block);
        padding-inline: var(--br-textarea-root-padding-inline);
        color: var(--br-textarea-root-font-color);
        background-color: transparent;
        flex-grow: 1;
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    textarea::-webkit-scrollbar {
        display: none;
    }
    .container {
        display: flex;
        border: var(--br-textarea-root-border);
        border-radius: var(--br-textarea-root-border-radius);
        background-color: var(--br-textarea-root-background-color);
        height: var(--br-textarea-root-height);
        width: 100%;
        transition: var(--br-textarea-root-transition);
    }
    .container:hover:not(:focus-within) {
        box-shadow: var(--br-textarea-root-hover-box-shadow);
        border: var(--br-textarea-root-hover-border);
    }
    .container:focus-within {
        box-shadow: var(--br-textarea-root-focus-box-shadow);
        border: var(--br-textarea-root-focus-border);
    }
</style>
