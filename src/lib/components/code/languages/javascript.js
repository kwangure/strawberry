import { HighlightJS } from "highlight.js/lib/core";
import highlighter from "highlight.js/lib/languages/javascript";
HighlightJS.registerLanguage("javascript", highlighter);
import "./javascript.css";

const highlight = (code) => HighlightJS.highlight(code, { language: "javascript" }).value;

export default highlight;