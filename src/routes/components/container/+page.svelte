<script>
	import { javascript, svelte } from '@kwangure/strawberry/code';
	import BasicCode from './01-basic.svelte?raw';
	import BasicDemo from './01-basic.svelte';
	import { Code } from '$internal';
	import PostfixCode from './03-postfix.svelte?raw';
	import PostfixDemo from './03-postfix.svelte';
	import TextareaCode from './04-textarea.svelte?raw';
	import TextareaDemo from './04-textarea.svelte';
	import ValidationHintsCode from './02-validation-hints.svelte?raw';
	import ValidationHintsDemo from './02-validation-hints.svelte';

	const description = [
		'The input Container adds layout and identity to input elements. It',
		'provides a canonical way to add labels, descriptions and validation',
		'to inputs.',
	].join('\n');
</script>

<svelte:head>
	<title>Input Container</title>
	<meta name='description' content={description}/>
</svelte:head>

<h1>Input Container</h1>
{description}

<h2>Examples</h2>
<h3>Basic usage</h3>
<div class='explainer'>
	The <Code inline highlighter={svelte} code="<Container/>"/> component
	provides layout for the input. It also provides a unique input id for each
	instance to associate labels with inputs.
</div>

<div class="demo">
	<Code highlighter={svelte} code={BasicCode}/>
	<div class="output">
		<BasicDemo/>
	</div>
</div>

<h3>Hints and validation</h3>
<div class='explainer'>
	<Code inline highlighter={svelte} code="<Container/>"/> simplifies
	displaying input hints and validating inputs. The
	provided `validate` action uses the built-in input HTML
	<a href="https://developer.mozilla.org/en-US/docs/Web/API/ValidityState">
		<Code inline highlighter={javascript} code="ValidityState"/>
		API
	</a>
	which provides internationalized errors for dozens of languages.

	Alternatively, you may use custom validation by providing an object
	to <Code inline highlighter={javascript} code="validate"/> with the
	following signature:

	<Code inline highlighter={javascript} code={[
		'{',
		'	error: (errorCode: string, input: HTMLInputElement) => string,',
		'	invalid: (input: HTMLElement) => string',
		'}',
	].join('\n')}/>


	If the input satisfies the built-in validation constraints,
	<Code inline highlighter={javascript} code="invalid(input)"/> is called
	and returns an error code,
	then <Code inline highlighter={javascript} code="error(errorCode, input)"/>
	is called and returns a string that is the error message. If the input failed
	built-in validation, only
	<Code inline highlighter={javascript} code="error(input.validity.<property>, input)"/>
	is called with the name of the built-in `Validity`state property it failed.
	Read more about the
	<a href="https://developer.mozilla.org/en-US/docs/Web/API/ValidityState">
		<Code inline highlighter={javascript} code="ValidityState"/>
		API on MDN
	</a> for details about input validation.
</div>

<div class="demo">
	<Code highlighter={svelte} code={ValidationHintsCode}/>
	<div class="output">
		<ValidationHintsDemo/>
	</div>
</div>

<h3>Postfix</h3>
<div class='explainer'>
	The number input provides a <Code inline highlighter={svelte} code="<Postfix/>"/>
	component to enable stepping the input value using a pointer.
</div>

<div class="demo">
	<Code highlighter={svelte} code={PostfixCode}/>
	<div class="output">
		<PostfixDemo/>
	</div>
</div>

<h3>Textarea</h3>
<div class='explainer'>
	<Code inline highlighter={svelte} code="<Container/>"/> also supports
	<Code inline highlighter={svelte} code="<textarea/>"/> elements.
</div>

<div class="demo">
	<Code highlighter={svelte} code={TextareaCode}/>
	<div class="output">
		<TextareaDemo/>
	</div>
</div>
