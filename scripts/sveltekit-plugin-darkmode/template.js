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
        import.meta.hot.on("${update_event}", (data) => {
            styles = data;
        });
    }

    function inject(style, css) {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");
        system_mode = prefersDark.matches ? "dark" : "light";
        prefersDark.addEventListener("change", ({ matches }) => {
            system_mode = matches ? "dark" : "light";
        });

        style.textContent = \`:root{\${css}}\`;
        return {
            update(css) {
                style.textContent = \`:root{\${css}}\`;
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
    import { onMount } from "svelte";

    export let theme = "berry";
    export let mode = "";

    let system_mode = "light";
    let styles = ${placeholder};

    $: internal = mode || system_mode;
    $: stylesheet = styles[theme][internal];

    onMount(() => {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");
        system_mode = prefersDark.matches ? "dark" : "light";
        prefersDark.addEventListener("change", ({ matches }) => {
            system_mode = matches ? "dark" : "light";
        });
    });
</script>

<svelte:head>
    <link rel="stylesheet" href={stylesheet}/>
</svelte:head>
`;
