<script>
	/* eslint-disable import/no-unresolved */
	import '$lib/internal/docs.css';
	import { css, svelte } from '@kwangure/strawberry/code';
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$lib/internal';
	import PopupArrowCode from './03-popup-arrow.svelte?raw';
	import PopupArrowDemo from './03-popup-arrow.svelte';
	import SelectedItemCode from './02-selected-item.svelte?raw';
	import SelectedItemDemo from './02-selected-item.svelte';

	const description = 'Dropdown displays a list of actions or options to a user.';
</script>

<svelte:head>
	<title>Dropdown</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>Dropdown</h1>
{description}

<h2>Examples</h2>
<h3>Basic usage</h3>
<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<div class="output">
		<BasicDemo/>
	</div>
</div>

<h3>Selected item</h3>
<div class='explainer'>
	To indicate that an item in the dropdown is true, you may add the
	<Code inline highlighter={css} code="aria-selected"/> attribute to the
	item.
</div>

<div class="demo">
	<Code highlighter={svelte} code={SelectedItemCode}/>
	<div class="output">
		<SelectedItemDemo/>
	</div>
</div>

<h3>Popup arrows</h3>
<div class='explainer'>
	You may optionally add an <Code inline highlighter={svelte} code="<Arrow/>"/>
	to the popup to indicate the selected trigger
</div>

<div class="demo">
	<Code highlighter={svelte} code={PopupArrowCode}/>
	<div class="output">
		<PopupArrowDemo/>
	</div>
</div>
