import './html.css';
import highlighter from 'highlight.js/lib/languages/xml';
import { HighlightJS } from 'highlight.js/lib/core';

HighlightJS.registerLanguage('xml', highlighter);
const highlight = (code) => HighlightJS.highlight(code, { language: 'xml' }).value;

export default highlight;
