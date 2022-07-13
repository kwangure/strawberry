import adapter from "@sveltejs/adapter-static";
import docs from "@kwangure/svelte-docs";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
import micromatch from 'micromatch';

const MODE = process.env.NODE_ENV;
const PROD = MODE === "production";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [
        docs(),
        inlineImport,
    ],
    kit: {
        appDir: "app",
        adapter: adapter(),
        package: {
            exports: (filepath) => {
                if (filepath.endsWith('.d.ts')) return false;

                const value = micromatch.isMatch(filepath, [
                    'build/vite-plugin-strawberry.js',
                    'components/**/index.js',
                    'components/**/*.css',
                    'components/Code/languages/**/*.js',
                    'css/**/*.(js|css)',
                    'utils/forward-events.js',
                    'utils/input/validationmessage.js',
                ]);

                return value;
            },
            files: (filepath) => {
                return micromatch.some(filepath, [
                    'build/**',
                    'components/**',
                    'css/**',
                    'utils/**',
                ]) && !micromatch.some(filepath, [
                    "components/**/docs.js",
                    "components/Input/css/**",
                ]);
            },
        },
        paths: {
            base: PROD ? "/strawberry" : "",
        },
    },
};
