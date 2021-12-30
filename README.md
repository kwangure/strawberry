<div align="center">
    <img src="./assets/strawberry_logo.png" style="max-height: 150px">
</div>

<p align="center">
    A set of Svelte components.<br/>
</p>

## Installation
```bash
npm i @kwangure/strawberry
```

## Usage
### Styling and Imports
```svelte
<script>
    /* Import one global stylesheet in root file */

    // Style for standard document
    import "@kwangure/strawberry/css/standardDOM";
    // Style for shadow root
    import "@kwangure/strawberry/css/customElement";

    import Button from "@kwangure/strawberry/components/Button";
</script>

<!--
    Use attribute or <style/> custom properties to override styles.
    See docs for supported `--br-[component]-#` custom properties.
-->

<div class="document">
    Text
    <Button primary --br-button-width="50px"
        on:click={() => console.log('strawberry')}>
        Click me!
    </Button>
</div>

<style>
    .document {
        --br-button-border: 3px solid red;
    }
</style>

```
### ENV Variables

```javascript
// rollup.config.js
import { sveltekitGlobals } from "@kwangure/strawberry/config";
import replace from "@rollup/plugin-replace";

...
plugins: [
    // SvelteKit replaces these Out of the Box™
    replace(sveltekitGlobals),
]
...
```

## License
[Apache 2.0](./LICENSE) © Kafungo Wangure