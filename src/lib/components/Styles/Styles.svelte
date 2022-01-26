<script>
    import "$lib/css/styles";
    import theme_manifest from "@theme-list";
    import { onMount } from "svelte";

    export let theme = "strawberry";
    export let mode = "light";
    export let persist = false;
    export const set_mode = (value) => {
        persist = true;
        storage_mode = value;
    };

    let mounted = false;
    let system_mode = mode;
    let storage_mode = mode;
    let stylesheet;

    $: mounted && localStorage.setItem("dark-mode-toggle", storage_mode);
    $: mode = persist ? storage_mode : system_mode;
    $: modes = theme_manifest.get(theme);
    $: stylesheet = modes[mode];

    onMount(() => {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");
        system_mode = prefersDark.matches ? "dark" : "light";
        prefersDark.addEventListener(({ matches }) => {
            system_mode = matches ? "dark" : "light";
        });

        storage_mode =
            localStorage.getItem("dark-mode-toggle") ||
            default_mode ||
            system_mode;

        mounted = true;
    });
</script>

<svelte:head>
    <!-- TODO: get "/app" from dynamically from config/globals? -->
    <link rel="stylesheet" href="/app/{stylesheet}" media="all" />
</svelte:head>

<slot mode="{mode}"/>
