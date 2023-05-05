<script>
    import { dev } from '$app/environment';
    import { javascript } from '@kwangure/strawberry/code';

    export let prop;

    $: ({ name, optional, value, jsDoc } = prop);
    $: ({ description, tags = []} = jsDoc || {});
    $: ({ type } = tags.find((t) => t.tag === 'type') || {});

    if (dev && !description) {
    	console.warn(`"${name}" prop is missing a description`);
    }

    if (dev && type === 'any') {
    	console.warn(`"${name}" property is typed "any". Use a stronger type.`);
    }
</script>

<tr>
    <td>
        <span>{name}</span>
    </td>
    <td class="type">
        {#if type}
            <code class="br-code-inline">
                {#each javascript(type) as { segment, color }}
                    {#if color}
                        <span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
                    {:else}
                        {segment}
                    {/if}
                {/each}
            </code>
        {:else}
            —
        {/if}
    </td>
    <td>
        {#if optional && JSON.stringify(value) !== undefined}
            <code class='br-code-inline'>
                {#each javascript(JSON.stringify(value)) as { segment, color }}
                    {#if color}
                        <span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
                    {:else}
                        {segment}
                    {/if}
                {/each}
            </code>
        {:else}
            —
        {/if}
    </td>
    <td>
        {description || '—'}
    </td>
</tr>

<style>
    td {
        padding: 8px;
        line-height: 2;
        /* Zooming makes collapsed border twice as thick sometimes */
        /* See https://stackoverflow.com/questions/68111310/thick-border-issue-in-chrome-browser*/
        border-width: 0.5px;
    }
    td {
        --br-code-root-white-space: pre-wrap;
    }
    .type {
        max-width: 300px;
    }
    @media (prefers-color-scheme: dark) {
        td {
            border: 1px solid #474b50;
        }
    }
    @media (prefers-color-scheme: light) {
        td {
            border: 1px solid #c3c3c3;
        }
    }
</style>
