import sveltePreprocess from "svelte-preprocess";
import cssnano from "cssnano";
import cssVars from "postcss-custom-properties";

export const preprocessConfig = sveltePreprocess({
    postcss: {
        plugins: [
            cssVars(),
            cssnano({
                preset: "default",
            }),
        ],
    },
});
