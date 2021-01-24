<p align="center">
    <a href="#"><img src="./assets/strawberry_logo.png" height="150px" /></a>
</p>

<p align="center">
    A set Svelte components.<br/>
</p>

<p align="center">
    <a href="#install"><strong>Install</strong></a> •
    <a href="#usage"><strong>Usage</strong></a>
</p>

## Installation and Usage
#### Install
```bash
npm i -D @kwangure/strawberry
```

#### Usage
```html
<!-- component.svelte -->
<script>
    import Button from "@kwangure/strawberry/components/Button";
</script>

<Button on:click="{() => alert('strawberry')}">
    Click me!
</Button>
```
```javascript
// rollup.config.js
import { preprocessConfig } from "@kwangure/strawberry/config";
import replace from "@rollup/plugin-replace";

...
plugins: [
    replace({
        // Tip: Vite replaces these vars Out of the Box™
        'import.meta.env.MODE': () => JSON.stringify(process.env.NODE_ENV),
        'import.meta.env.DEV': () => String(process.env.NODE_ENV === 'development'),
        'import.meta.env.PROD': () => String(process.env.NODE_ENV === 'production'),
    }),
    // Compile strawberry
    svelte({
        ...
        preprocess: preprocessConfig,
        include: "@kwangure/strawberry/**"
        ...
    }),
    // Compile your components
    svelte({
        ...
        exclude: "@kwangure/strawberry/**"
        ...
    }),
    ...
]
...
```