
<!--
	This document is generated from '/docs/README_TEMPLATE.md'. Do not edit it directly.
-->
# Strawberry

This is a library of Svelte sub-components. Its design encourages you to build
your own components, keeping only the functionality that you need.

Where possible, our components are simply a light wrapper around built-in
elements, making it easier to use them the Svelte way.

**NOTE**:

> 🍓 **Strawberry is not stable.**

## Installation

```bash
npm i @kwangure/strawberry
```

## General usage

### Button

```html
<script>
	import '@kwangure/strawberry/default/button';

	let count = 0;
	const increment = () => count++;
</script>

<button on:click={increment} style="margin-right: 10px;">
	Increment Counter
</button>
{count}
```

### Code

```html
<script>
	import { Code, javascript } from '@kwangure/strawberry/default/code';

	const code = 'const five = 5;\nconst thirty = five * 6';

</script>

<Code highlight={javascript} code={code}/>
```

### Dialog

```html
<script>
	import { Dialog } from '@kwangure/strawberry/default/dialog';

	let value = '?';

	/** @type {() => any} */
	let showModal;

	/** @param {CustomEvent} event */
	function handleClose(event) {
		value = event.detail.returnValue;
	}
</script>

The best framework is: {value} <br>

<Dialog bind:showModal on:close={handleClose}>
	<button value='svelte'>Svelte</button>
</Dialog>

<button on:click={showModal}>Show modal</button>
```

### Dropdown

```html
<script>
    import { Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
</script>

<Dropdown>
	<button slot="trigger">
		Click for dropdown
	</button>
	<Popup>
		<div class="br-dropdown-item">Purple</div>
		<div class="br-dropdown-item">Penguin</div>
		<div class="br-dropdown-item">Has</div>
		<div class="br-dropdown-item">Landed</div>
	</Popup>
</Dropdown>
```

### Element

```html
<script>
    import { Element } from '@kwangure/strawberry/default/element';

    const element = {
     type: 'p',
     props: {
      style: 'font-style: italic; color: purple;',
     },
     children: 'I am a dynamically generated purple <p/> tag element.',
    };
</script>

<Element {element}/>
```

### Inputs

```html
<script>
    import { Container } from '$lib/default/input/container';
    import { Postfix } from '$lib/default/input/number';
    import { validate } from '$lib/components/input/validate.js';
</script>

<Container let:inputId let:hintId let:validationMessage>
    <label slot='label' for={inputId}>
        This is an input label
    </label>
    <input type=number id={inputId} aria-describedby={hintId} required use:validate/>
    <Postfix/>
    <span slot='hint' id={hintId} class:invalid={validationMessage}>
        {#if validationMessage}
            <!-- Display validation errors -->
            {validationMessage}
        {:else}
            This is a description or input hint
        {/if}
    </span>
</Container>

<style>
    .invalid {
        color: red;
    }
</style>
```

TODO:

- [x] Add a TODO list :)
- [ ] Document other components...

## License

[Apache 2.0](./LICENSE) © Kafungo Wangure


