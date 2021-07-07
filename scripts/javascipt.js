import * as acorn from "acorn";
import acornClassFields from "acorn-class-fields";
import acornStaticClassFeatures from "acorn-static-class-features";

export const parser = acorn.Parser.extend(
    acornClassFields,
    acornStaticClassFeatures,
);

export function isMalformed(code) {
    try {
        parser.parse(code, {
            sourceType: "module",
            ecmaVersion: 2020,
        });
        return false;
    } catch (error) {
        return error;
    }
}
