# Strawberry
A set of Svelte components.

> 🍓 **Strawberry is not stable.**.

## Installation
```bash
npm i @kwangure/strawberry
```

## Usage
```html
<script>
    import { Button } from '@kwangure/strawberry/default/button';

    const hello = () => alert('strawberry');
</script>

<div class="element">
    <Button on:click={hello}>Click me!</Button>
</div>

<style>
    /* Override preset values */
    .element {
        --br-button-root-width: 50px;
        --br-button-root-border: 3px solid turquoise;
    }
</style>
```

## License
[Apache 2.0](./LICENSE) © Kafungo Wangure