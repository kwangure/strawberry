<script>
    import Select, { Option } from "../../Select";
    import Container from "../Container.svelte";
    import Icon from "../../Icon";
    import { mdiClockOutline } from "@mdi/js";
    import parseTime from "./parseTime";

    /** @type {boolean}*/
    export let hideLabel = false;
    /** @type {string | Date } An ISO 8601 dateString or Date */
    export let value = "";

    function pad(value, length, padString) {
        return String(value).padStart(length, padString);
    }

    function transform(n) {
        return pad(n, 2, "0");
    }

    function range(start, stop, options) {
        const { step = 1, transform = (a) => a } = options;
        return Array(stop - start).fill(start)
            .map((x, y) => transform(x + (y * step)));
    }

    let nowHour, nowMinutes, nowMeridiem;

    $: if (value) {
        const time = new Date(value);
        nowHour = transform(time.getHours() % 12 || 12);
        nowMinutes = transform(time.getMinutes());
        nowMeridiem = time.getHours() > 11 ? "pm": "am";
    } else {
        nowHour = "";
        nowMinutes = "";
        nowMeridiem = "";
    }

    const hours = range(1, 13, { transform });
    const minutes = range(0, 60, { transform });

    function handleChange() {
        if (nowHour && nowMinutes && nowMeridiem) {
            value = parseTime(`${nowHour}:${nowMinutes} ${nowMeridiem}`);
        }
    }

    function handleHourChange({ detail: hour }) {
        nowHour = hour;
        handleChange();
    }
    function handleMinuteChange({ detail: minutes }) {
        nowMinutes = minutes;
        handleChange();
    }
    function handleMeridiemChange({ detail: meridiem }) {
        nowMeridiem = meridiem;
        handleChange();
    }
</script>

<Container class="berry-input-time" {hideLabel} let:labelId>
    <slot name="label" slot="label"/>
    <div class="container">
        <div class="time">
            <Select hideLabel on:change={handleHourChange} placeholder="--"
                value={nowHour}>
                {#each hours as hour}
                    <Option value={hour}>{Number(hour)}</Option>
                {/each}
            </Select>
            :
            <Select hideLabel on:change={handleMinuteChange} placeholder="--"
                value={nowMinutes}>
                {#each minutes as minute}
                    <Option value={minute}>{minute}</Option>
                {/each}
            </Select>
            <Select hideLabel on:change={handleMeridiemChange} placeholder="--"
                value={nowMeridiem}>
                <Option value="am">am</Option>
                <Option value="pm">pm</Option>
            </Select>
        </div>
        <div class="postfix-wrapper">
            <Icon path={mdiClockOutline} size="21"></Icon>
        </div>
    </div>
</Container>

<style>
    @import "../css/container.css";
    @import "../css/postfix.css";
    .time {
        display: flex;
        align-items: center;
    }
    /**
        Work around https://github.com/sveltejs/svelte/issues/4374
        See https://github.com/sveltejs/svelte/issues/4374#issuecomment-586045062.
    */
    .container :global(.container.container),
    .container :global(.container.container:focus-within),
    .container :global(.container.container:hover:not(:focus-within)) {
        border: 2px solid transparent;
        height: 100%;
        box-shadow: none;
        padding: 0;
    }
    .container :global(.berry-input .postfix-wrapper) {
        display: none;
    }
    .container :global(.berry-select input) {
        --input-padding: 2px;
        width: calc(2ch + var(--input-padding)*2);
        text-align: right;
        padding: var(--br-input-vertical-padding) var(--input-padding);
        font-variant-numeric: tabular-nums;
    }
    .container :global(.berry-select:nth-child(3) input) {
        width: calc(3ch + 2 * var(--input-padding));
        text-align: center;
    }
    .container :global(.berry-select.placeholder input) {
        text-align: center;
    }
    .container :global(.container input:hover),
    .container :global(.container:focus-within input) {
        background-color: var(--br-primary-light);
    }
    .container :global(.berry-dropdown-menu) {
        max-height: calc(10 * var(--br-item-height));
        overflow-y: scroll;
    }
</style>