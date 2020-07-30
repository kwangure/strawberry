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
npm i -D @deimimi/strawberry
```

#### Usage
```html
<!--App.svelte-->
<script>
    import { Button } from "@deimimi/strawberry";
</script>

<Button color="primary" on:click="{() => alert('strawberry')}">
    Click me!
</Button>
```
```javascript
// rollup.config.js
import { preprocessConfig } from "@deimimi/strawberry/config";
...
plugins: [
    ...
    svelte({
        ...
        preprocess: preprocessConfig,
        ...
    }),
    ...
]
...
```