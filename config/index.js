import cssImport from "postcss-import";
import cssnano from "cssnano";
import cssVars from "postcss-custom-properties";

export const preprocessConfig = {
    postcss: {
        plugins: [
            cssImport(),
            cssVars(),
            cssnano({
                preset: "default",
            }),
        ],
    },
};
