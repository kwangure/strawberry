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
## Limitations
This is a compnent library built in and for Sveltekit. Replacing Sveltekit ENV
variables is a good place to start if you'd like to use it in other contexts.
Though it may work, other enviroments are not actively supported.
```javascript
// rollup.config.js
import replace from "@rollup/plugin-replace";

...
plugins: [
    // SvelteKit replaces these Out of the Box™
    replace({
    "import.meta.env.MODE": () => JSON.stringify(process.env.NODE_ENV),
    "import.meta.env.DEV": () => String(process.env.NODE_ENV === "development"),
    "import.meta.env.PROD": () => String(process.env.NODE_ENV === "production"),
}),
]
...
```

## License
[Apache 2.0](./LICENSE) © Kafungo Wangure