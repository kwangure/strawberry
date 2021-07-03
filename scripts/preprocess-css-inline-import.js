import { parse, walk } from "svelte/compiler";
import fs from "fs";
import path from "path";

function getCSS(expr, dir) {
    const value = expr.type === "Url"
        ? expr.value.value
        : expr.value;
    const relative = value.substring(1, value.length - 1);
    const filepath = path.join(dir, relative);

    return fs.readFileSync(filepath, "utf8");
}

function getCode(content, imports) {
    let result = "";
    const end = imports.reduce((end, imp) => {
        result += content.substring(end, imp.start) + imp.css;
        return imp.end;
    }, 0);
    result += content.substring(end, content.length);
    return result;
}

export default {
    async markup({ content, filename }) {
        const ast = parse(content).css;
        if (!ast) return;

        const dir = path.dirname(filename);
        const imports = [];
        await walk(ast, { enter(node) {
            if (node.type === "Style") return;
            if (node.type !== "Atrule" || node.name !== "import") {
                return this.skip();
            }

            const { start, end, prelude: { children }} = node;
            const [cssPath, , mediaNode] = children;
            const atrule = { start, end };
            const css = getCSS(cssPath, dir);

            if (mediaNode) {
                const { start, end } = mediaNode;
                atrule.css = `\n@media ${content.substring(start, end)} {\
    \n${css}\n}\n`;
            } else {
                atrule.css = css;
            }

            imports.push(atrule);
        } });
        const code = getCode(content, imports);
        return { code };
    },
};
