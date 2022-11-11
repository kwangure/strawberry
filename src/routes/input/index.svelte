<script>
    import Component from '$lib/internal/component.svelte';
    import { Container } from '$lib/default/input/container';
    import { docs } from '$lib/docs/input/text';
    import { Text as Input } from '$lib/default/input/text';
</script>

<Component {docs}>
    <svelte:fragment slot="inline">
        <Container let:inputId let:descriptionId let:validationMessage>
            <label slot='label' for={inputId}>
                I label inputs like no one else!
            </label>
            <Input id={inputId} placeholder="I can say anything!" required/>
            <span slot='hint' id={descriptionId} class:invalid={validationMessage}>
                {#if validationMessage}
                    {validationMessage}
                {:else}
                    This is a description or input hint
                {/if}
            </span>
        </Container>
    </svelte:fragment>
</Component>

<style>
    .invalid {
        color: red;
    }
</style>
