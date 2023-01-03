import { parser as cppParser } from '@lezer/cpp';
import { parser as cssParser } from '@lezer/css';
import { highlight } from './highlight';
import { parser as htmlParser } from '@lezer/html';
import { parser as jsonParser } from '@lezer/json';
import { parser as jsParser } from '@lezer/javascript';
import { parseMixed } from '@lezer/common';
import { parser as pythonParser } from '@lezer/python';
import { parser as rustParser } from '@lezer/rust';
import { svelteLanguage } from '@replit/codemirror-lang-svelte';

export const css = highlight.bind(null, cssParser);

export const javascript = highlight.bind(null, jsParser);

const mixedHTMLParser = htmlParser.configure({
	wrap: parseMixed((node) => {
		if (node.name == 'ScriptText') {
			return { parser: jsParser };
		} else if (node.name == 'StyleText') {
			return { parser: cssParser };
		}

		return null;
	}),
});

export const mixedHTML = highlight.bind(null, mixedHTMLParser);

export const plainHTML = highlight.bind(null, htmlParser);

export const json = highlight.bind(null, jsonParser);

export const python = highlight.bind(null, pythonParser);

export const cpp = highlight.bind(null, cppParser);

export const rust = highlight.bind(null, rustParser);

export const svelte = highlight.bind(null, svelteLanguage.parser);

