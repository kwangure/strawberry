<script>
    import Component from '$lib/internal/component.svelte';
    import { docs } from '$lib/docs/input/textarea';
    import { Textarea } from '$lib/default/input/textarea';
</script>

<Component {docs}>
    <Textarea slot="inline" placeholder="I can say anything!"/>
</Component>
