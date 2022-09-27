# Strawberry
A set of Svelte components.

Where possible, a Strawberry component is simply a light wrapper around a built-in element, making it easier to use it the Svelte way.
<br>
<br>
> 🍓 **Strawberry is not stable.**

## Installation
```bash
npm i @kwangure/strawberry
```

## General usage
### Button
```html
<script>
    import '@kwangure/strawberry/default/css/components.css';

    const hello = () => alert('strawberry');
</script>

<button on:click={hello}>Click me!</button>
```
### Code
```html
<script>
    import { Code, javascript } from '@kwangure/strawberry/default/code';
</script>

<Code language={javascript} code='const five = 5;'/>
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
    	attributes: {
    		style: 'font-style: italic; font-weight: 700;',
    	},
    	children: 'I am a dynamically generated purple <p/> tag element.',
    };
</script>

<Element {element}/>
```



## License
[Apache 2.0](./LICENSE) © Kafungo Wangure