import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

let nested  = ["Button", "Dropdown", "Input", "Sidebar", "Select",];
let singles = ["Icon", "Modal", "Tooltip"];
let paths = [
    ...nested,
    ...singles.map(component => `${component}.svelte`)
]

export default [
    ...paths.map(component => ({
        input: `js/components/${component}`,
        output: {
            name: component.replace(".svelte", ""),
            file: `dist/${component.replace(".svelte", "")}.js`,
            format: "umd",
            sourcemap: true,
        },
        plugins: [
            svelte({
                dev: false,
                css: true,
                hydratable: true,
                accessors: true,
            }),
            resolve({
                browser: true,
                dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
                preferBuiltins: true
            }),
            commonjs(),
            globals(),
            terser(),
        ],
        onwarn: function (message, warn) {
			if (message.pluginCode === 'missing-custom-element-compile-options') {
				return
			}
			warn(message)
		}
    })),
];

