<script>
	import { javascript, svelte } from '@kwangure/strawberry/code';
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$internal';

	const description = [
		'Tooltip displays informative text when users hover over, focus on,',
		'or tap an element.',
	].join('');
</script>

<svelte:head>
	<title>Tooltip</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>Tooltip</h1>
<p>{description}</p>

<h2>Examples</h2>
<h3>Basic usage</h3>
<p>
	Pass a <Code inline highlighter={javascript} code='checked'/> value
	indicating whether it is checked, unchecked or indeterminate.
</p>

<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<p>
		<BasicDemo/>
	</p>
</div>
