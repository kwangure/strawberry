<script>
    import "$lib/css/styles";
    import dark from "$lib/css/dark.css?url";
    import light from "$lib/css/light.css?url";
    import { onMount } from "svelte";

    // Vite currently messes imports https://github.com/vitejs/vite/issues/5130
    let fixed_dark = dark.slice("export default '".length, dark.length - 1);
    let fixed_light = light.slice("export default '".length, light.length - 1);

    export let default_mode = "light";
    export let persist = false;
    export const set_mode = (value) => {
        persist = true;
        storage_mode = value;
    }

    let mounted = false;
    let system_mode = default_mode;
    let storage_mode = default_mode

    $: mounted && localStorage.setItem("dark-mode-toggle", storage_mode)
    $: mode = persist ? storage_mode : system_mode;
    $: mounted && add_class(mode);
    $: stylesheet = mode === "light" ? fixed_light : fixed_dark;

    function add_class() {
        let light = "br-light", dark = "br-dark";
        let [add, remove] = mode === "light" ? [light, dark] : [dark, light];
        document.body.classList.add(add);
        document.body.classList.remove(remove);
    }

    onMount(() => {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");
        system_mode = prefersDark.matches ? "dark" : "light";
        prefersDark.addListener(({ matches }) => {
            system_mode = matches ? "dark" : "light";
        });

        storage_mode = localStorage.getItem("dark-mode-toggle")
            || default_mode
            || system_mode;

        mounted = true;
    });
</script>

<svelte:head>
    <link rel="stylesheet" href={stylesheet} media="all"/>
</svelte:head>

<slot {mode}></slot>
