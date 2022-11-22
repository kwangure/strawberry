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

{% test language="html" src="./examples/button/01-basic/component.svelte" /%}

### Code

```html
<script>
    import { Code, javascript } from '@kwangure/strawberry/default/code';
</script>

<Code highlight={javascript} code='const five = 5;'/>
```

### Dialog

```html
<script>
    import { Content, Dialog, Header } from '@kwangure/strawberry/default/dialog';

    /** @type {(() => void)} */
    let showModal;
    /** @type {(() => void)} */
    let show;

    function handleDialogValue(event) {
        if (event.detail.returnValue === 'cancel') return;
        fetch('/api', { body: event.detail.formData });
    }
</script>

<Dialog bind:showModal bind:show on:close={handleDialogValue}>
    <Header slot='header'>
        What is your first name?
    </Header>
    <Content slot='content'>
        <input name="firstname"/>
    </Content>
    <Footer slot='content'>
        <button value='submit'>Submit</button>
        <button value='cancel'>Cancel</button>
    </Footer>
</Dialog>
<button on:click={show}>Show</button>
<button on:click={showModal}>Show modal</button>
```

### Dropdown

```html
<script>
    import { Arrow, Dropdown, Item, Popup } from '@kwangure/strawberry/default/dropdown';
</script>

<Dropdown>
    <button slot="trigger">
        Click for dropdown
    </button>
    <Popup>
        <Arrow/>
        <Item>Purple</Item>
        <Item active>Penguin</Item>
        <Item>Has</Item>
        <Item>Landed</Item>
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