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
Include the Strawberry Vite plugin in your config.
```javascript
// svelte.config.js
import { strawberry } from "@kwangure/strawberry/build/vite-plugin-strawberry";

/** @type {import("@sveltejs/kit").Config} */
export default {
    kit: {
        ...
        vite: {
            plugins: [
                strawberry(),
                ...
            ],
        }
        ...
    }
};
```
```svelte
<script>
    import Button from "@kwangure/strawberry/components/button";

    const hello = () => alert("strawberry");
</script>

<div class="element">
    <Button on:click={hello}>Click me!</Button>
</div>

<style>
    // Import style presets
    @import "@kwangure/strawberry/components/button/layout.css";
    @import "@kwangure/strawberry/components/button/dark.css" (prefers-color-scheme: dark);
    @import "@kwangure/strawberry/components/button/light.css" (prefers-color-scheme: light);

    // Override imported preset values
    .element {
        --br-button-width: 50px;
        --br-button-border: 3px solid red;
    }
</style>

```

*Note:* This library is for use in svelte-kit projects only.

## License
[Apache 2.0](./LICENSE) © Kafungo Wangure