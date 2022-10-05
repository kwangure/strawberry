// FIXME: Do proper types
// @ts-nocheck
import './html.css';
import highlighter from 'highlight.js/lib/languages/xml';
import HighlightJS from 'highlight.js/lib/core';

HighlightJS.registerLanguage('xml', highlighter);
/**
 * @param {string} code
 */
function highlight(code) {
	return HighlightJS.highlight(code, { language: 'xml' }).value;
}

export default highlight;
