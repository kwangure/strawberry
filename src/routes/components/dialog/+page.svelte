<script>
	/* eslint-disable import/no-unresolved */
	import '$lib/internal/docs.css';
	import { css, javascript, svelte } from '@kwangure/strawberry/code';
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$lib/internal';
	import DialogFormCode from './02-dialog-form.svelte?raw';
	import DialogFormDemo from './02-dialog-form.svelte';
	import DirectionalContainerCode from './03-directional-container.svelte?raw';
	import DirectionalContainerDemo from './03-directional-container.svelte';

	const description = 'Dialog presents a dialog box or modal.';
</script>

<svelte:head>
	<title>Dialog</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>Dialog</h1>
{description}

<h2>Examples</h2>
<h3>Basic usage</h3>
<div class='explainer'>
	Non-modal dialogs allow users to interact with other sections of the page while
	the dialog is open, by hiding the backdrop. Use Svelte's
	<Code inline highlighter={javascript} code="'modal'"/> or
	<Code inline highlighter={javascript} code="'non-modal'"/>
	to open the form in your desired mode. Pass
	<Code inline highlighter={javascript} code="false"/> to close the dialog.
</div>

<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<div class="output">
		<BasicDemo/>
	</div>
</div>

<h3>Dialog Forms</h3>
<div class='explainer'>
	The `Dialog` component uses the built-in
	<Code inline highlighter={svelte} code="<dialog/>"/> element. It takes
	advantage of the fact that a
	<Code inline highlighter={svelte} code="<form method='dialog'/>"/> element
	closes its parent dialog element when the form is submitted. This
	allows you to retrieve user-submitted values in response to the
	<Code inline highlighter={javascript} code="close"/> event. For example,
	you may use the <Code inline highlighter={javascript} code="value"/>
	<Code inline highlighter={svelte} code="<button/>"/>
	attribute of elements to submit values to the dialog.
</div>

<div class="demo">
	<Code highlighter={svelte} code={DialogFormCode}/>
	<div class="output">
		<DialogFormDemo/>
	</div>
</div>

<h3>Directional container</h3>
<div class='explainer'>
	Add the <Code inline highlighter={css} code=".br-dialog-inline-section"/>
	class to presentational section to layout the content in the inline direction
	(left to right) and <Code inline highlighter={css} code=".br-dialog-block-section"/>
	to layout the content in the block direction. The block container adds a scrollbar
	when the content overflows the container.
</div>

<div class="demo">
	<Code highlighter={svelte} code={DirectionalContainerCode}/>
	<div class="output">
		<DirectionalContainerDemo/>
	</div>
</div>
