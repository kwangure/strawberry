// FIXME: Do proper types
// @ts-nocheck
import './css.css';
import highlighter from 'highlight.js/lib/languages/css';
import HighlightJS from 'highlight.js/lib/core';

HighlightJS.registerLanguage('css', highlighter);
/**
 * @param {string} code
 */
function highlight(code) {
	return HighlightJS.highlight(code, { language: 'css' }).value;
}

export default highlight;
