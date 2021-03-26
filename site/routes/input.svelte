<script>
    import Checkbox, { Group as CheckboxGroup } from "~@components/Input/Checkbox";
    import Input, { Number, Password } from "~@components/Input";
    import Radio, { Group as RadioGroup } from "~@components/Input/Radio";

    let radioValue = "";
    let checkboxFruits = [];
</script>

<Input placeholder="Write me! I'm text input">
    <span slot="label">Write me! I'm text input</span>
</Input>
<Number placeholder="Count me! I'm number input">
    <span slot="label">Count me! I'm number input</span>
</Number>
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
        {radioValue}: Awww! You're listening! 😍
    </div>
{/if}

<Checkbox value="checkie">
    <span slot="label">Check me out! I'm checkbox</span>
</Checkbox>
<CheckboxGroup bind:group={checkboxFruits}>
    <div>I like:</div>
    <Checkbox value="mango">
        <span slot="label">Mango</span>
    </Checkbox>
    <Checkbox value="nothing else">
        <span slot="label">Nothing else</span>
    </Checkbox>
    <div>
        {#if checkboxFruits.length == 1}
            I like {checkboxFruits[0]}
        {:else if checkboxFruits.length > 1}
            I like {checkboxFruits[0]}, {checkboxFruits[0]} and {checkboxFruits[1]}!
        {/if}
    </div>
</CheckboxGroup>
<Password placeholder="Steal me! I'm password">
    <span slot="label">Steal me! I'm password</span>
</Password>