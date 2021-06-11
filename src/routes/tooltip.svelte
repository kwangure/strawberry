<script>
    import Button from "~@components/Button";
    import Tooltip from "~@components/Tooltip";
</script>

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