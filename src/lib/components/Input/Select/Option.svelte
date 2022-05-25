<script>
    import { createEventForwarder } from "../../../utils/forward-events.js";

    /**
     * If this Boolean attribute is set, this option is not checkable.
     *
     * @type {boolean | undefined}
     */
    export let disabled = undefined;

    /**
     * Indicates the meaning of the Option. Falls back to the text content
     * of the option.
     *
     * @type {string | undefined}
     */
    export let label = undefined;

    /**
     * Indicates this the Option is initially selected.
     *
     * @type {boolean | undefined}
     */
    export let selected = undefined;

    /**
     * The value of the Option.
     *
     * @type {string}
     */
    export let value = "";

    const forward = createEventForwarder();
</script>

<option {disabled} {label} {value} {selected} use:forward>
    <slot/>
</option>

<style>
    option {
        color: var(--br-option-text-color, initial);
        padding: var(--br-option-padding-block, 5px) var(--br-option-padding-inline, 8px);
        cursor: pointer;
    }
</style>