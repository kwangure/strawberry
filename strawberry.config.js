import sveltePreprocess from "svelte-preprocess";
import cssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import cssVars from "postcss-css-variables";

// for use with in Svelte projects
export default sveltePreprocess({
    postcss: {
        plugins: [
            cssImport(),
            autoprefixer(),
            cssnano({
                preset: 'default',
            }),
        ],
    },
});

// custom elements config
export const customElementsPreprocess = sveltePreprocess({
    postcss: {
        plugins: [
            cssImport(),
            autoprefixer(),
            cssnano({
                preset: 'default',
            }),
            cssVars(),
        ],
    },
});