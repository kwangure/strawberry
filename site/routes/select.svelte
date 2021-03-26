<script>
    import Select, { Option } from "~@components/Select";
    import { browser } from "$app/env";
</script>

{#if browser}
    <Select placeholder="Like I said..." label="Pick me! I'm smart.">
        <Option value={"testicle"}>Testicle Rainbow</Option>
    </Select>
{/if}