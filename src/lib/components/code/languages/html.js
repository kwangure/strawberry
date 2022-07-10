import { HighlightJS } from "highlight.js/lib/core";
import highlighter from "highlight.js/lib/languages/xml";
import "./html.css";

HighlightJS.registerLanguage("xml", highlighter);
const highlight = (code) => HighlightJS.highlight(code, { language: "xml" }).value;

export default highlight;