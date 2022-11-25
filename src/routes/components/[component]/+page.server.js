/* eslint-disable import/namespace, import/named */
import Button from '$lib/components/button/button.css:docs';
import Code from '$lib/components/code/code.svelte:docs';
import Dialog from '$lib/components/dialog/dialog.svelte:docs';
import { error } from '@sveltejs/kit';
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
	dialog: Dialog,
};

for (const component of Object.values(components)) {
	const directory = `/${component.name.toLowerCase()}/`;
	component.examples = [];
	for (const [filepath, importer] of Object.entries(examples)
		.filter(([filepath]) => filepath.includes(directory))) {
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
