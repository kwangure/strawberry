export function mousePosInBoundingRect(node) {
    let onchange = () => {};
    let rect = { x: 0, y: 0, top: 0, left: 0, width: 0, height: 0 };
    node.addEventListener("mousemove", e => {
        rect.x = rect.left = e.clientX;
        rect.y = rect.top = e.clientY;
        onchange();
    });
    return {
        getBoundingClientRect: () => {
            return rect;
        },
        onchange: (fn) => onchange = fn,
    };
}

export function toggleListener(node, event, handler, add) {
    node[add ? "addEventListener": "removeEventListener"](event, handler);
}