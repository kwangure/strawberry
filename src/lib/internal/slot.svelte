<script>
    import Code from "~@components/Code";

    export let slotDocs;

    let keywordObj = {};

    $: ({ name, description = "", keywords = []} = slotDocs);
    $: {
        keywordObj = {};
        for (const { name, description } of keywords) {
            keywordObj[name] = description;
        }
    }
    $: ({ usage = "" } = keywordObj);
</script>

<tr>
    <td>
        {name}
    </td>
    <td>
        {description || "—"}
    </td>
</tr>

<style>
    td {
        border: var(--br-border);
        padding: 8px;
        line-height: 2;
        /* Zooming makes collapsed border twice as thick sometimes */
        /* See https://stackoverflow.com/questions/68111310/thick-border-issue-in-chrome-browser*/
        border-width: 0.5px;
    }
    td {
        --br-code-white-space: pre-wrap;
    }
</style>