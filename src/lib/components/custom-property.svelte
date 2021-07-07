<script>
    import Code from "~@components/Code";

    export let propertyDocs;

    $: ({ name, value, cssDoc } = propertyDocs);
    $: ({ description, tags = []} = cssDoc || {});
    $: ({ type } = tags.find((t) => t.tag === "type") || {});

    // @ts-ignore
    if (import.meta.DEV && !description) {
        console.warn(`"${name}" prop is missing a description`);
    }

    // @ts-ignore
    if (import.meta.DEV && type === "any") {
        console.warn(`"${name}" property is typed "any". Use a stronger type.`);
    }
</script>

<Code language="css">
    {name}: {value};
</Code>
<br>
