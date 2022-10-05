// Register languages
import './css.js';
import './html.js';
import './javascript.js';
import HighlightJS from 'highlight.js/lib/core';

HighlightJS.registerLanguage('svelte', highlight_svelte);

// Adapted from https://github.com/AlexxNB/highlightjs-svelte
/**
 * @type {import('highlight.js').LanguageFn}
 */
function highlight_svelte(hljs) {
	return {
		name: 'svelte',
		subLanguage: 'xml',
		contains: [
			hljs.COMMENT('<!--', '-->', {
				relevance: 10,
			}),
			{
				begin: /^(\s*)(<script(\s*context="module")?>)/gm,
				end: /^(\s*)(<\/script>)/gm,
				subLanguage: 'javascript',
				excludeBegin: true,
				excludeEnd: true,
				contains: [
					{
						begin: /^(\s*)(\$:)/gm,
						end: /(\s*)/gm,
						className: 'keyword',
					},
				],
			},
			{
				// Add a redundant `{1}` qualifier because Svelte compiler chokes
				// I haven't filed a bug. I'm lazy. Please do before you delete this comment
				begin: /^(\s*)(<st{1}yle.*>)/gm,
				end: /^(\s*)(<\/style>)/gm,
				subLanguage: 'css',
				excludeBegin: true,
				excludeEnd: true,
			},

			{
				begin: /\{/gm,
				end: /\}/gm,
				subLanguage: 'javascript',
				contains: [
					{
						begin: /[{]/,
						end: /[}]/,
						skip: true,
					},
					{
						begin: /([#:/@])(if|else|each|await|then|catch|debug|html)/gm,
						className: 'keyword',
						relevance: 10,
					},
				],
			},
		],
	};
}

/**
 * @param {string} code
 */
function highlight(code) {
	return HighlightJS.highlight(code, { language: 'svelte' }).value;
}

export default highlight;
