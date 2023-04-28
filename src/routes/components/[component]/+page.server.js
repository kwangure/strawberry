/* eslint-disable import/namespace, import/named */
import Button from '$lib/css/button.css:docs';
import Code from '$lib/css/code.css:docs';
import Container from '$lib/components/input/container/container.svelte:docs';
import Dialog from '$lib/components/dialog/dialog.svelte:docs';
import Dropdown from '$lib/components/dropdown/dropdown.svelte:docs';
import Element from '$lib/components/element/element.svelte:docs';
import { error } from '@sveltejs/kit';
import Item from '$lib/default/item/style.css:docs';
import path from 'path';

/**
 * @typedef {{
 * 		ast: import('@markdoc/markdoc').AstType;
 *		frontmatter: Record<string, unknown>;
 *		html: string;
 * 		tree: import('@markdoc/markdoc').RenderableTreeNodes;
 * }} MarkdocImport
 */

/** @type {Record<string, MarkdocImport>} */
const examples = import.meta.glob('$docs/examples/**/README.md', {
	eager: true,
	query: { html: true, tree: true },
});
const sources = import.meta.glob('$docs/examples/**/**.svelte', { eager: true, as: 'raw' });

/**
 * @type {Record<string, any>}
 */
const components = {
	button: Button,
	code: Code,
	container: Container,
	dialog: Dialog,
	dropdown: Dropdown,
	element: Element,
	item: Item,
};

for (const [name, component] of Object.entries(components)) {
	component.name = `${name[0].toUpperCase()}${name.slice(1)}`;
	component.examples = [];
	for (const [filepath, importer] of Object.entries(examples)
		.filter(([filepath]) => filepath.includes(`/${name}/`))) {
		const dirname = path.dirname(filepath);
		const sourcepath = `${dirname}/component.svelte`;
		component.examples.push({
			code: sources[sourcepath],
			readme: {
				frontmatter: importer.frontmatter,
				tree: importer.tree,
			},
			filepath: sourcepath,
		});
	}
}


/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
	const { component } = params;
	const docs = components[component];
	if (!docs) throw error(404, 'Unknown component');

	return docs;
}
