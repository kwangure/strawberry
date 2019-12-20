import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import terser from 'rollup-plugin-terser';
import svelte from 'rollup-plugin-svelte'
import globals from 'rollup-plugin-node-globals'

let nested  = ["Button", "Dropdown", "Input", "Sidebar", "Select",];
let singles = ["Icon", "Modal", "Tooltip"];
let paths = [
    ...nested,
    ...singles.map(component => `${component}.svelte`)
]

const production = !process.env.ROLLUP_WATCH

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
                // enable run-time checks when not in production
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
            production && terser(),
        ],
        onwarn: function (message, warn) {
			if (message.pluginCode === 'missing-custom-element-compile-options') {
				return
			}
			warn(message)
		}
    })),
];

