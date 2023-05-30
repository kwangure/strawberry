<script>
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$internal';
	import { svelte } from '@kwangure/strawberry/code';

	const description = [
		'Focusable should be applied to an action a user can perform or a link',
		'to a page displayed in a group.',
	].join('\n');
</script>

<svelte:head>
	<title>Focusable</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>Focusable</h1>
<p>{description}</p>

<h2>Examples</h2>
<h3>Basic usage</h3>
<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<div class="output">
		<BasicDemo/>
	</div>
</div>
