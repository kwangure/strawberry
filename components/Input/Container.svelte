<script>
    import uid from "uid";

    let className = "";
    export { className as class };
    export let hideLabel = false;

    const labelId = uid();

    if (import.meta.env.DEV && !$$slots.label) {
        console.error(`
The 'label' slot must be included. If you want to hide it pass the
'hideLabel' prop.

To read about a hidden '<label/>' for accessibility reasons, see:
https://www.w3.org/WAI/tutorials/forms/labels/#hiding-label-text
        `.trim());
    }
</script>

<div class="{className} wrapper">
    <label class:br-accessible-hide={hideLabel} for={labelId} >
        <slot name="label"/>
    </label>
    <slot {labelId}></slot>
</div>

<style>
    .wrapper {
        display: inline-block;
        width: 100%;
        line-height: 1.5;
    }
    label {
        display: inline-block;
        margin-bottom: 5px;
    }
</style>