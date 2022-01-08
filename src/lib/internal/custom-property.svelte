<script>
    import Code, { css } from "~@components/Code";

    export let propertyDocs;

    $: ({ property, cssDoc } = propertyDocs);
    $: ({ description, tags = []} = cssDoc || {});
    $: ({ type } = tags.find((t) => t.tag === "type") || {});

    // @ts-ignore
    if (import.meta.DEV && !description) {
        console.warn(`"${property}" prop is missing a description`);
    }

    // @ts-ignore
    if (import.meta.DEV && type === "any") {
        console.warn(`"${property}" property is typed "any". Use a stronger type.`);
    }
</script>

<Code language={css} inline code={property}/>&nbsp;