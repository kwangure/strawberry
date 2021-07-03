<p align="center">
    <img src="./assets/strawberry_logo.png" height="150px">
</p>

<p align="center">
    A set of Svelte components.<br/>
</p>

## Installation
```bash
npm i @kwangure/strawberry
```

## Usage
### Styling and Imports
```html
<script>
    /* Import one global stylesheet in root file */

    // Style for standard document
    import "@kwangure/strawberry/css/standardDOM";
    // Style for shadow root
    import "@kwangure/strawberry/css/customElement";

    import Button from "@kwangure/strawberry/components/Button";
</script>

<Button on:click="{() => alert('strawberry')}">
    Click me!
</Button>
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