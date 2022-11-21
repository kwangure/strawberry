import { parser as cssParser } from '@lezer/css';
import { highlight } from './highlight';
import { parser as htmlParser } from '@lezer/html';
import { parser as jsParser } from '@lezer/javascript';
import { parseMixed } from '@lezer/common';

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

