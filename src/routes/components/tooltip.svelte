<script>
    import Button from "~@components/Button";
    import Code from "~@components/Code";
    import Tooltip from "~@components/Tooltip";

    const sides = ["top", "right", "bottom", "left"];
    const sideModifiers = ["", "-start", "-end"];
    const placements = [];

    for (const side of sides) {
        placements.push(...sideModifiers.map((mod) => side + mod));
    }
</script>

<h1>Tooltip</h1>
<h4>Properties</h4>
<h5>Placement</h5>
<p>Type:</p>
<Code language="javascript">{`
"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | \
"bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"
`.trim()}</Code>
<p>Usage:</p>
<Code language="svelte">{`
<Tooltip placement="bottom">
    <div class="my-element">Hover me for a tooltip!</div>
</Tooltip>
`.trim()}</Code>
<p>Examples:</p>
<div class="properties examples">
    {#each placements as placement}
        <Tooltip {placement}>
            <Button>{placement}</Button>
            <span slot="popup">I'm a <b>{placement}</b> tooltip!</span>
        </Tooltip>
    {/each}
</div>
<Tooltip>
    <Button>
        Hover for tooltip.
    </Button>
    <span slot="popup">Yes, Mi tooltip.</span>
</Tooltip>

<Tooltip gesture="click">
    <Button>
        Click for tooltip.
    </Button>
    <span slot="popup">Yes, Mi tooltip.</span>
</Tooltip>

<style>
    .properties.examples {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(3, max-content);
    }
    h4,
    h5 {
        margin-top: 10px;
    }
</style>
