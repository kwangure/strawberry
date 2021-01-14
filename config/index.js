import sveltePreprocess from "svelte-preprocess";
import cssnano from "cssnano";
import cssImport from "postcss-import";
import cssVars from "postcss-custom-properties";

export const preprocessConfig = sveltePreprocess({
    postcss: {
        plugins: [
            cssImport(),
            cssVars(),
            cssnano({
                preset: "default",
            }),
        ],
    },
});
