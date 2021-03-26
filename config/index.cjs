const cssnano = require("cssnano");
const cssImport = require("postcss-import");
const cssVars = require("postcss-custom-properties");

module.exports.preprocessConfig = {
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
