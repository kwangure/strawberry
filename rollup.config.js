import { terser } from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import resolve from "rollup-plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import { customElementsPreprocess }  from "./config/internal";

let components  = [
    "Button", 
    "Dropdown", 
    "Input", 
    "List", 
    "Select", 
    "Sidebar", 
    "Steps",
    "Icon", 
    "Modal", 
    "Tooltip"
];

export default [
    ...components.map(component => ({
        input: `js/components/${component}`,
        output: {
            name: component,
            file: `dist/${component}.js`,
            format: "umd",
        },
        plugins: [
            svelte({
                preprocess: customElementsPreprocess,
                customElement: true,
            }),
            resolve({
                browser: true,
                dedupe: importee => importee === "svelte" || importee.startsWith("svelte/"),
                preferBuiltins: true,
            }),
            commonjs(),
            globals(),
            terser(),
        ],
    })),
];

