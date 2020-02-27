<p align="center">
    <a href="#"><img src="./assets/strawberry_logo.png" height="150px" /></a>
</p>

<p align="center">
    A set Svelte components.<br/>
</p>

<p align="center">
    <a href="#quick-start"><strong> Quick Start </strong></a> •
    <a href="#installation-and-usage"><strong>Installation and Usage</strong></a> <!--•
    <a href="#attribution"><strong>Attribution</strong></a-->
</p>

## Quick Start
```html
<script src="https://unpkg.com/@deimimi/strawberry@latest/dist/Button.js"></script>

<berry-button color="primary" onclick="alert('strawberry');">Click me!</berry-button>
```
#### 🐉 🔥 Here be dragons!
While Strawberry components have been made available as web components, 
Strawberry is best consumed as Svelte components inside Svelte projects. Svelte has [a few critical issues](https://github.com/sveltejs/svelte/issues?q=is%3Aissue+is%3Aopen+label%3A%22custom+element%22) that limit full
support for compiling to web components (particularly nesting components).

## Installation and Usage
#### Install
```bash
npm i @deimimi/strawberry
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
<!--
## Attribution
The Strawberry logo was created using the Winnie font.-->