<script>
	import { css, javascript, svelte } from '@kwangure/strawberry/code';
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$internal';
	import DirectionalContainerCode from './02-directional-container.svelte?raw';
	import DirectionalContainerDemo from './02-directional-container.svelte';

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
