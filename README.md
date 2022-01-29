<div align="center">
    <img src="./assets/strawberry_logo.png" style="max-height: 150px">
</div>

<p align="center">
    A set of Svelte components.<br/>
</p>

> 🍓 **Strawberry is not stable.** Its APIs are useable for most uses cases, but are not "finalized" and will have breaking changes. We're still getting the architecture right.

## Installation
```bash
npm i @kwangure/strawberry
```

## Usage
```svelte
<script>
    import "@kwangure/strawberry/css/styles";

    import Button from "@kwangure/strawberry/components/Button";

    const hello = () => console.log('strawberry');
</script>

<div class="document">
    <Button on:click={hello}>Click me!</Button>
</div>

<style>
    .document {
        --br-button-width: 50px;
        --br-button-border: 3px solid red;
    }
</style>

```

*Note:* This library is for use in svelte-kit projects only.

## License
[Apache 2.0](./LICENSE) © Kafungo Wangure