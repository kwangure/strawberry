<script>
	import { css, svelte } from '@kwangure/strawberry/code';
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$internal';
	import InlineCode from './02-inline.svelte?raw';
	import InlineDemo from './02-inline.svelte';
	import SupportedLanguagesCode from './03-supported-languages.svelte?raw';
	import SupportedLanguagesDemo from './03-supported-languages.svelte';

	const description = [
		'Code highlights snippets of code that appears along with body text, while',
		'preserving its formatting.',
		'Use inline code snippets when you wish to highlight a short code snippet',
		'from the surrounding default text, such as when referencing variable names.',
	].join('\n');
</script>

<svelte:head>
	<title>Code</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>Code</h1>
<p>{description}</p>

<h2>Examples</h2>
<h3>Basic usage</h3>
<p>
	Import a highlighter for your desired language and pass it along with the
	code.
</p>

<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<p>
		<BasicDemo/>
	</p>
</div>

<h3>Inline usage</h3>
<p>
	Use the <Code inline highlighter={css} code=".br-code-inline"/> class prop
	to render code inline along with text.
</p>

<div class="demo">
	<Code highlighter={svelte} code={InlineCode}/>
	<p>
		<InlineDemo/>
	</p>
</div>

<h3>Supported languages</h3>
<p>
	The following is a sample of the different supported languages.
</p>

<div class="demo">
	<Code highlighter={svelte} code={SupportedLanguagesCode}/>
	<p>
		<SupportedLanguagesDemo/>
	</p>
</div>

