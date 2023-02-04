import adapter from "@sveltejs/adapter-vercel";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
import micromatch from 'micromatch';

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [
        inlineImport,
    ],
    kit: {
        appDir: "app",
        adapter: adapter({
            edge: true,
            external: [],
            split: false
        }),
        alias: {
            '@kwangure/strawberry': './src/lib',
        },
    },
    package: {
        exports: (filepath) => {
            if (filepath.endsWith('.d.ts')) return false;

            const value = micromatch.isMatch(filepath, [
                'actions/**',
                'default/**',
                'components/**/index.js',
                'components/code/languages/**/*.js',
                'css/**/*.(js|css)',
                'utils/events.js',
                'utils/input/validationmessage.js',
            ]);

            return value;
        },
        files: (filepath) => {
            return micromatch.some(filepath, [
                'actions/**',
                'components/**',
                'css/**',
                'default/**',
                'utils/**',
            ]);
        },
    },
};
