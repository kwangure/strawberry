export const serveTemplate = ({ update_event }) => `
<script>
    import "@kwangure/strawberry/css/styles";
    import { onMount } from "svelte";

    export let theme = "berry";
    export let mode = "";

    // Default to light for SSR
    let system_mode = "light";

    let styles = {};

    $: css = styles?.[theme]?.[mode];

    if (import.meta.hot) {
        import.meta.hot.on("${update_event}", async (data) => {
            styles = data;
        });
    }

    onMount(() => {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");
        system_mode = prefersDark.matches ? "dark" : "light";
        prefersDark.addEventListener("change", ({ matches }) => {
            system_mode = matches ? "dark" : "light";
        });
    });
</script>

<svelte:head>
    <style>{css}</style>
</svelte:head>
`;