<script>
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$internal';
	import PostfixCode from './02-postfix.svelte?raw';
	import PostfixDemo from './02-postfix.svelte';
	import { svelte } from '@kwangure/strawberry/code';
	import TextareaCode from './03-textarea.svelte?raw';
	import TextareaDemo from './03-textarea.svelte';

	const description = [
		'The input Container adds layout and identity to input elements. It',
		'provides a canonical way to add labels, descriptions and validation',
		'to inputs.',
	].join('\n');
</script>

<h1>Input Container</h1>
<p>{description}</p>

<h2>Examples</h2>
<h3>Basic usage</h3>
<p>
	The <Code inline highlighter={svelte} code="<Container/>"/> component
	provides layout for the input. It also provides a unique input id for each
	instance to associate labels with inputs.
</p>

<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<p class="output">
		<BasicDemo/>
	</p>
</div>

<h3>Postfix</h3>
<p>
	The number input provides a <Code inline highlighter={svelte} code="<Postfix/>"/>
	component to enable stepping the input value using a pointer.
</p>

<div class="demo">
	<Code highlighter={svelte} code={PostfixCode}/>
	<p class="output">
		<PostfixDemo/>
	</p>
</div>

<h3>Textarea</h3>
<p>
	<Code inline highlighter={svelte} code="<Container/>"/> also supports
	<Code inline highlighter={svelte} code="<textarea/>"/> elements.
</p>

<div class="demo">
	<Code highlighter={svelte} code={TextareaCode}/>
	<p class="output">
		<TextareaDemo/>
	</p>
</div>
