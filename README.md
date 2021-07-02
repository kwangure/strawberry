<p align="center">
    <a href="#"><img src="./assets/strawberry_logo.png" height="150px" /></a>
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
### Preprocessing
Sveltekit
```javascript
// svelte.config.js
import { strawberryPreprocess } from "@kwangure/strawberry/config/index.js";

export default {
    preprocess: [
        strawberryPreprocess,
        // ... your preprocessors
    ],
    ...
};
```

Rollup
```javascript
// rollup.config.js
import { strawberryPreprocess, sveltekitGlobals } from "@kwangure/strawberry/config";
import replace from "@rollup/plugin-replace";

...
plugins: [
    // SvelteKit replaces these Out of the Box™
    replace(sveltekitGlobals),
    svelte({
        ...
        preprocess: [
            strawberryPreprocess,
            // ...your preprocessors
        ]
        ...
    }),
]
...
```

## License
[Apache 2.0](./LICENSE) © Kafungo Wangure