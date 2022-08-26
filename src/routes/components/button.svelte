<script>
    import Component from '$lib/internal/component.svelte';
    import { Primary } from '$lib/default/button';
</script>

<Component docs={{}}>
    <svelte:fragment slot="inline">
        <Primary>
            <button>I do nothing primary!</button>
        </Primary>
        <button>I do nothing too!</button>
    </svelte:fragment>
</Component>
