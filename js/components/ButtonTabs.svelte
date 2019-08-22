<script>
    import ButtonGroup from './ButtonGroup.svelte'
    import Button from './Button.svelte'

	export let tabs = []
    let selected = tabs[0]
</script>

{#if tabs.length > 0}
    <div class="tab-wrapper">
        <div class="tab-header">
            <ButtonGroup>
                {#each tabs as tab, i}
                    <Button 
                        on:click={(event, index=i) => {selected = tabs[index] }}
                        active={selected === tabs[i]}>
                        {tab.title}
                    </Button>
                {/each}
            </ButtonGroup>
        </div>
        <div class="tab-content">
            <svelte:component this={selected.component} {...selected.props}/>
        </div>
    </div>
{/if}

<style>
    .tab-wrapper {
        padding: 5px 10px;
    }
    .tab-header,
    .tab-content {
        padding: 5px 10px;
    }
</style>
