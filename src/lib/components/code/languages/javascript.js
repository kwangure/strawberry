import './javascript.css';
import highlighter from 'highlight.js/lib/languages/javascript';
import { HighlightJS } from 'highlight.js/lib/core';

HighlightJS.registerLanguage('javascript', highlighter);

const highlight = (code) => HighlightJS.highlight(code, { language: 'javascript' }).value;

export default highlight;
