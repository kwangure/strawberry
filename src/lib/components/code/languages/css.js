import './css.css';
import highlighter from 'highlight.js/lib/languages/css';
import { HighlightJS } from 'highlight.js/lib/core';

HighlightJS.registerLanguage('css', highlighter);
const highlight = (code) => HighlightJS.highlight(code, { language: 'css' }).value;

export default highlight;
