// FIXME: Do proper types
// @ts-nocheck
import './javascript.css';
import highlighter from 'highlight.js/lib/languages/javascript';
import HighlightJS from 'highlight.js/lib/core';

HighlightJS.registerLanguage('javascript', highlighter);

/**
 * @param {string} code
 */
function highlight(code) {
	return HighlightJS.highlight(code, { language: 'javascript' }).value;
}

export default highlight;
