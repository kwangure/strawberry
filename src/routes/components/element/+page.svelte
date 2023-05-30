<script>
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$internal';
	import { svelte } from '@kwangure/strawberry/code';

	const description = 'Element renders a DOM tree that is represented by JSON';
</script>

<svelte:head>
	<title>Element</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>Element</h1>
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

