<script>
    import "@kwangure/strawberry/css/styles";
    import { getStylesheetStore } from "@theme-list";
    import { onMount } from "svelte";

    export let theme = "berry";
    export let mode = "";

    // Default to light for SSR
    let system_mode = "light";

    $: stylesheet = getStylesheetStore(theme, mode || system_mode);

    onMount(() => {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");
        system_mode = prefersDark.matches ? "dark" : "light";
        prefersDark.addEventListener("change", ({ matches }) => {
            system_mode = matches ? "dark" : "light";
        });
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="{$stylesheet}"/>
</svelte:head>

<slot mode="{mode}"/>
