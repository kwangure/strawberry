import type { ActionReturn } from 'svelte/action';

/**
 * Actions are functions that are called when an element is created.
 * You can use this interface to type such actions.
 * The following example defines an action that only works on `<div>` elements
 * and optionally accepts a parameter which it has a default value for:
 * ```ts
 * export const myAction: Action<HTMLDivElement, { someProperty: boolean }> = (node, param = { someProperty: true }) => {
 *   // ...
 * }
 * ```
 * You can return an object with methods `update` and `destroy` from the function.
 * See interface `ActionReturn` for more details.
 *
 * Docs: https://svelte.dev/docs#template-syntax-element-directives-use-action
 */
export interface Action<T = HTMLElement, Parameter = any> {
    (node: T, parameter?: Parameter): void | ActionReturn<Parameter>;
}
