
<!--
	This document is generated from 'docs/README_TEMPLATE.md'. Do not edit it directly.
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
	import '@kwangure/strawberry/css/button.css';

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
	import { javascript } from '@kwangure/strawberry/code';

	const code = 'const five = 5;\nconst thirty = five * 6';
</script>

<code>
	{#each javascript(code) as { segment, color }}
		{#if color}
			<span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
		{:else}
			{segment}
		{/if}
	{/each}
</code>
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
    		style: 'font-style: italic; color: red;',
    	},
    	children: ['I am a dynamically generated red <p/> tag element.'],
    };
</script>

<Element {element}/>```

### Inputs

```html
<script>
	import { Container } from '@kwangure/strawberry/default/input/container';
</script>

<Container let:inputId>
	<label slot='label' for={inputId}>
		This is the input label
	</label>
	<input id={inputId} placeholder="I can say anything!"/>
</Container>

<Container let:inputId>
	<label slot='label' for={inputId}>
		Pick a pizza toping.
	</label>
	<select id={inputId}>
		<option>Pineapple</option>
		<option>Pepperoni</option>
		<option>Peppers</option>
	</select>
</Container>
```

TODO:

- [x] Add a TODO list :)
- [ ] Document other components...

## License

[Apache 2.0](./LICENSE) © Kafungo Wangure


