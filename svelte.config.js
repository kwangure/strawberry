import adapter from "@sveltejs/adapter-static";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
import micromatch from 'micromatch';

const MODE = process.env.NODE_ENV;
const PROD = MODE === "production";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [
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
                    'default/**',
                    'components/**/index.js',
                    'components/code/languages/**/*.js',
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
                    'default/**',
                    'utils/**',
                ]);
            },
        },
        paths: {
            base: PROD ? "/strawberry" : "",
        },
        prerender: {
            default: true,
        },
    },
};
