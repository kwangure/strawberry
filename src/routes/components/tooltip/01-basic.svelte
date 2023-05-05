<script>
    import { Arrow, Popup, Tooltip } from '$lib/default/tooltip';

    const placement = /** @type {const} */('top-end');
</script>

<Tooltip {placement}>
    <button class='br-button-primary' slot="trigger">
        {placement}
    </button>
    <Popup>
        <Arrow/>
        I'm a <b>{placement}</b> tooltip!
    </Popup>
</Tooltip>
