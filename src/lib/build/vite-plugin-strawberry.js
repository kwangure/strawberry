const isOldThemer = (/** @type {string} */ id) => /@kwangure\/strawberry\/css\/Theme/.test(id);
const isThemer = (/** @type {string} */ id) => /@kwangure\/strawberry\/components\/Theme/.test(id);
const isCSS = (/** @type {string} */ id) => /\.css($|\?)/.test(id);

export function strawberry() {
    return {
        name: "sveltekit-darkmode-pre",
        enforce: "pre",
        config() {
            return {
                optimizeDeps: {
                    exclude: [
                        "@kwangure/strawberry/components/Theme",
                        "@kwangure/strawberry/components/Theme.svelte",
                    ],
                },
            };
        },
        /**
         * @param {string} id
         */
        resolveId(id) {
            if (isThemer(id)) {
                if (id.endsWith(".svelte")) return id;
                return `${id}.svelte`;
            }

            if (isOldThemer(id)) {
                throw "The 'Theme' component has moved to '@kwangure/strawberry/components/Theme'";
            }
        },
        /**
         * @param {string} id
         */
        async load(id) {
            if (isThemer(id)) {
                throw Error('Strawberry no longer parses uses the \'Theme\' component for themeing.');
            }
        },
        /**
         * @param {string} code
         * @param {string} id
         */
        async transform(code, id) {
            if (!isCSS(id)) return;

            if (code.includes(":scope")) {
                throw Error("Strawberry no longer parses the ':scope' selector. Use ':root' instead.");
            }
        },
    };
}