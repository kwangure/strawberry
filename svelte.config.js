import adapter from "@sveltejs/adapter-vercel";

/** @type {import("@sveltejs/kit").Config} */
export default {
    kit: {
        appDir: "app",
        adapter: adapter({
            edge: true,
            external: [],
            split: false
        }),
        alias: {
            '@kwangure/strawberry': './src/lib',
            '$internal': './src/internal',
            '$types': './src/types.d.ts',
        },
    },
};
