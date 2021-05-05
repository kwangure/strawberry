<script>
    import Button from "~@components/Button";
    import { Time } from "~@components/Input";

    let value;

    const reset = () => value = "";
    const now = () => value = new Date().toString();
</script>

<Time bind:value></Time>
<Button on:click={reset}>Reset</Button>
<Button on:click={now}>Now</Button>

<style>

</style>