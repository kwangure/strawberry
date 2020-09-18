<script>
    import "./Input.css";
    import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
    import Input from "./Input.svelte";
    import Icon from "../Icon";

    export let label;
    export let hideLabel = false;
    export let placeholder = "";
    export let icon = "";
    export let min = Number.MIN_SAFE_INTEGER;
    export let max = Number.MAX_SAFE_INTEGER;
    export let value = "";
    export let step = 1;
    export let stepOnly = false;
    export let disabled = false;
    export let autofocus = false;
    export let focus = false;
    export let invalid = () => false;

    function clamp(value, min, max) {
        if (isNaN(value)) return "";
        return Math.min(Math.max(value, min), max);
    }
</script>

<Input {autofocus} bind:value {disabled} {focus} {hideLabel} {icon} {invalid}
    {label} on:change={() => value = clamp(value, min, max)} on:focus on:input
    on:keypress on:keydown {placeholder} readonly={stepOnly}>
    <div slot="postfix" class="postfix-wrapper">
        <span class="postfix-up"
            on:click|stopPropagation={() => value = clamp(value + step, min, max)}>
            <Icon path={mdiChevronUp} size={21}></Icon>
        </span>
        <span class="postfix-down"
            on:click|stopPropagation={() => value = clamp(value - step, min, max)}>
            <Icon path={mdiChevronDown} size={21}></Icon>
        </span>
    </div>
</Input>

<style>
    .postfix-wrapper {
        flex-direction: column;
    }
    .postfix-up,
    .postfix-down {
        flex: 1;
        min-height: 0;
        display: flex;
        align-items: center;
    }
</style>