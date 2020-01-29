# :strawberry: A set of Svelte components

## Install

```
npm i @deimimi/strawberry
```

## Usage

```html
<script>
    import { Button } from "@deimimi/strawberry";

    let value = 1;
</script>

<p>I have {value} pencils.</p>
<Button on:click="{() => value = 2}"></Button>
```

The build process is currently opinionated based on how I consume Strawberry in my projects.

### Setting up Rollup
```javascript
// rollup.config.js
import config from "@deimimi/strawberry/strawberry.config";

plugins: [
    ...,
    svelte({
        ...,
        ...config, // postcss config to preprocess Strawberry 
        ...,
    }),
    ...
],
```
See the [config file](./strawberry.config.js) if you already have preprocessing for Svelte setup. Strawberry only <em>really</em> requires `postcss-import` to be successfully bundle.