<script>
    import Radio, { Group as RadioGroup } from "~@components/Input/Radio";

    let radioValue = "";
</script>

<RadioGroup bind:value={radioValue}>
    <Radio value="chill">
        <span slot="label">Listen to me! I'm radio</span>
    </Radio>
    <Radio value="crae-crae">
        <span slot="label">LISTEN TO ME! I'M RADIO</span>
    </Radio>
</RadioGroup>
{#if radioValue}
    <div>
        You're {radioValue} like me!😍
    </div>
{/if}