export default async function loadHighlighter(language) {
    return (await import(`./languages/${language}.js`)).default;
}
