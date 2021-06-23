<script>
    import Checkbox, { Group as CheckboxGroup } from "~@components/Input/Checkbox";

    let checkboxFruits = [];
</script>

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