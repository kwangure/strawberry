<script>
    import Code, { javascript } from '~@components/code';

    export let prop;

    $: ({ kind, name, optional, value, jsDoc } = prop);
    $: ({ description, tags = []} = jsDoc || {});
    $: ({ type } = tags.find((t) => t.tag === 'type') || {});

    // @ts-ignore
    if (import.meta.DEV && !description) {
    	console.warn(`"${name}" prop is missing a description`);
    }

    // @ts-ignore
    if (import.meta.DEV && type === 'any') {
    	console.warn(`"${name}" property is typed "any". Use a stronger type.`);
    }
</script>

<tr>
    <td>
        <span>{name}</span>
    </td>
    <td class="type">
        {#if type}
            <Code inline language="{javascript}" code="{type}" />
        {:else}
            —
        {/if}
    </td>
    <td>
        {#if optional && JSON.stringify(value) !== undefined}
            <Code
                inline
                language="{javascript}"
                code="{JSON.stringify(value)}"
            />
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
        border: var(--br-default-border);
        padding: 8px;
        line-height: 2;
        /* Zooming makes collapsed border twice as thick sometimes */
        /* See https://stackoverflow.com/questions/68111310/thick-border-issue-in-chrome-browser*/
        border-width: 0.5px;
    }
    td {
        --br-code-white-space: pre-wrap;
    }
    .type {
        max-width: 300px;
    }
</style>
