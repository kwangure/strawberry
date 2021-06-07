<script>
    import Select, { Option } from "~@components/Select";
</script>

<Select placeholder="Like I said...">
    <svelte:fragment slot="label">Pick me! I'm smart.</svelte:fragment>
    <Option value={"testicle"}>Testicle Rainbow</Option>
</Select>