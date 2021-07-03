// Tip: Sveltekit replaces these Out of the Box™
export const sveltekitGlobals = {
    "import.meta.env.MODE": () => JSON.stringify(process.env.NODE_ENV),
    "import.meta.env.DEV": () => String(process.env.NODE_ENV === "development"),
    "import.meta.env.PROD": () => String(process.env.NODE_ENV === "production"),
};
