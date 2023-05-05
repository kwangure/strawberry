<script>
    import { Switch } from '$lib/default/switch';

    let checked = true;
</script>

<Switch bind:checked/> {checked ? '': 'un'}checked
