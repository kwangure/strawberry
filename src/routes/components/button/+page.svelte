<script>
	import { css, svelte } from '@kwangure/strawberry/code';
	import AlternativeButtonsCode from './03-alternative-buttons.svelte?raw';
	import AlternativeButtonsDemo from './03-alternative-buttons.svelte';
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$internal';
	import IgnoringStylesCode from './04-ignoring-styles.svelte?raw';
	import IgnoringStylesDemo from './04-ignoring-styles.svelte';
	import PrimaryCode from './02-primary.svelte?raw';
	import PrimaryDemo from './02-primary.svelte';

	const description = 'Button triggers an event or action. They let users know what will happen next.';
</script>

<svelte:head>
	<title>Button</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>Button</h1>
<p>{description}</p>

<h2>Examples</h2>
<h3>Basic usage</h3>
<p>
	The default Strawberry theme exports button styles to get you started quickly. Import
	the button module to include the styles.
</p>

<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<p>
		<BasicDemo/>
	</p>
</div>

<h3>Primary button</h3>
<p>
	Add the <Code inline highlighter={css} code=".br-button-primary"/>
	class to a button to give it an accent color that puts emphasis on it.
</p>

<div class="demo">
	<Code highlighter={svelte} code={PrimaryCode}/>
	<p>
		<PrimaryDemo/>
	</p>
</div>

<h3>Alternative buttons</h3>
<p>
	Generally, only the <Code inline highlighter={svelte} code="<button/>"/>
	element should be used for actions. In some cases though, what seems like an
	action to the user is actually a navigation in the app or a general click.
	Use the <Code inline highlighter={svelte} code="role='button'"/>
	attribute on non-button elements to give them a button appearance.
</p>

<div class="demo">
	<Code highlighter={svelte} code={AlternativeButtonsCode}/>
	<p>
		<AlternativeButtonsDemo/>
	</p>
</div>

<h3>Ignoring styles</h3>
<p>
	Add the <Code inline highlighter={css} code=".br-ignore"/>
	class to exclude a button from Strawberry styling.
</p>

<div class="demo">
	<Code highlighter={svelte} code={IgnoringStylesCode}/>
	<p>
		<IgnoringStylesDemo/>
	</p>
</div>
