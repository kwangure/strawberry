<script>
    // FIXME: Do proper types
    // @ts-nocheck

    export let slotDocs;

    let keywordObj = {};

    $: ({ name, description = '', keywords = []} = slotDocs);
    $: {
    	keywordObj = {};
    	for (const { name, description } of keywords) {
    		keywordObj[name] = description;
    	}
    }
</script>

<tr>
    <td>
        {name}
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
