import { HighlightJS } from "highlight.js/lib/core";
import highlighter from "highlight.js/lib/languages/css";
import "./css.css";

HighlightJS.registerLanguage("css", highlighter);
const highlight = (code) => HighlightJS.highlight(code, { language: "css" }).value;

export default highlight;
