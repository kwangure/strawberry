import { highlightTree, tagHighlighter, tags } from '@lezer/highlight';
import { escape } from 'svelte/internal';

const colors = tagHighlighter([
	{ tag: tags.link, class: 'link' },
	{ tag: tags.heading, class: 'heading' },
	{ tag: tags.emphasis, class: 'emphasis' },
	{ tag: tags.strong, class: 'strong' },
	{ tag: tags.keyword, class: 'keyword' },
	{ tag: tags.atom, class: 'atom' },
	{ tag: tags.bool, class: 'bool' },
	{ tag: tags.url, class: 'url' },
	{ tag: tags.labelName, class: 'label-name' },
	{ tag: tags.inserted, class: 'inserted' },
	{ tag: tags.deleted, class: 'deleted' },
	{ tag: tags.literal, class: 'literal' },
	{ tag: tags.string, class: 'string' },
	{ tag: tags.number, class: 'number' },
	{ tag: [tags.regexp, tags.escape, tags.special(tags.string)], class: 'string2' },
	{ tag: tags.variableName, class: 'variable-name' },
	{ tag: tags.local(tags.variableName), class: 'variable-name local' },
	{ tag: tags.definition(tags.variableName), class: 'variable-definition-name' },
	{ tag: tags.special(tags.variableName), class: 'variable-name2' },
	{ tag: tags.definition(tags.propertyName), class: 'property-name definition' },
	{ tag: tags.typeName, class: 'type-name' },
	{ tag: tags.namespace, class: 'namespace' },
	{ tag: tags.className, class: 'classname' },
	{ tag: tags.macroName, class: 'macro-name' },
	{ tag: tags.propertyName, class: 'property-name' },
	{ tag: tags.operator, class: 'operator' },
	{ tag: tags.comment, class: 'comment' },
	{ tag: tags.meta, class: 'meta' },
	{ tag: tags.invalid, class: 'invalid' },
	{ tag: tags.punctuation, class: 'punctuation' },
]);

/**
 * @param {import('@lezer/lr').LRParser} parser
 * @param {string} code
 */
export function highlight(parser, code) {
	const parsed = parser.parse(code);
	let pos = 0, highlighted = '';
	highlightTree(parsed, colors, (from, to, color) => {
		highlighted += escape(code.slice(pos, from));
		highlighted += `<span style='color: var(--br-code-token-${color}-color);'>${escape(code.slice(from, to))}</span>`;
		pos = to;
	});
	highlighted += escape(code.slice(pos));
	return highlighted;
}

