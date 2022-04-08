export const serveTemplate = ({ update_event, styles }) => `
<script>
    import "@kwangure/strawberry/css/styles";

    export let theme = "berry";
    export let mode = "";

    let system_mode = "light";
    let styles = ${JSON.stringify(styles)};

    $: internal = mode || system_mode;
    $: css = styles?.[theme]?.[internal];

    if (import.meta.hot) {
        fetch("http://localhost:3000/__themer_api/styles")
            .then(async (response) => {
                styles = await response.json();
            });

        import.meta.hot.on("${update_event}", (update) => {
            styles = update;
        });
    }

    function inject(style, css) {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");
        system_mode = prefersDark.matches ? "dark" : "light";
        prefersDark.addEventListener("change", ({ matches }) => {
            system_mode = matches ? "dark" : "light";
        });
        style.textContent = css;
        return {
            update(css) {
                style.textContent = css;
            }
        };
    }
</script>

<svelte:head>
    <style use:inject={css}></style>
</svelte:head>
`;

export const buildTemplate = ({ placeholder }) => `
<script>
    import "@kwangure/strawberry/css/styles";
    import { browser } from '$app/env';

    export let theme = "berry";
    /**
     * Defaults to system preference if \`""\` is provided
     * @type {"dark" | "light" | ""}
     */
    export let mode = "";
    export const styles = ${placeholder};

    let system_mode = "light";

    if (browser) {
        const prefers_dark = matchMedia("(prefers-color-scheme: dark)");
        system_mode = prefers_dark.matches ? "dark" : "light";
        prefers_dark.addEventListener("change", ({ matches }) => {
            system_mode = matches ? "dark" : "light";
        });
    }

    let dark_media = "(prefers-color-scheme: dark)";
    let light_media = "(prefers-color-scheme: light)";
    let dark_disabled, light_disabled, current_mode;

    $: current_mode = mode || system_mode;
    $: if (browser && current_mode === "dark") {
        dark_media = "all";
        dark_disabled = false;
        light_media = "not all";
        light_disabled = true;
    } else if (browser) {
        dark_media = "not all";
        dark_disabled = true;
        light_media = "all";
        light_disabled = false;
    }

    function disabled(link, value) {
        link.disabled = value;
        return {
            update(value) {
                link.disabled = value;
            },
        };
    }
</script>

<svelte:head>
    <!--
        Don't force people to download CSS they don't need based on their theme preference.
        Non-matching stylesheets still get loaded, but don't compete for bandwidth in the
        critical rendering path.
    -->
    <link rel="stylesheet" href="{styles[theme].dark}" media={dark_media} use:disabled={dark_disabled}>
    <link rel="stylesheet" href="{styles[theme].light}" media={light_media} use:disabled={light_disabled}>
</svelte:head>
`;
