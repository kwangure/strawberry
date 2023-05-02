<script>
	/* eslint-disable import/no-unresolved */
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$lib/internal';
	import { svelte } from '@kwangure/strawberry/code';

	const description = [
		'ListItem is an action a user can perform or a link to a page displayed',
		'in a group.',
	].join('\n');
</script>

<svelte:head>
	<title>List Item</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>List Item</h1>
{description}

<h2>Examples</h2>
<h3>Basic usage</h3>
<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<div class="output">
		<BasicDemo/>
	</div>
</div>
