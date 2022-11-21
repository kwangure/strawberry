import Button from '$lib/components/button/button.css:docs';
import { error } from '@sveltejs/kit';
import path from 'path';

/**
 * @typedef {{
 * 		ast: import('@markdoc/markdoc').AstType;
 *		frontmatter: Record<string, unknown>;
 *		htm: string;
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
 * @type {Record<string, {
 * 		name: string;
 * 		description: string;
 * 		customProperties: {
 * 			customProperty: string;
 * 			value?: string;
 * 		}[];
 * 		workingDirectoryFilepath: string;
 * 		examples: {
 * 			code: string,
 * 			readme: {
 * 				frontmatter: MarkdocImport['frontmatter'],
 * 				tree: MarkdocImport['tree'],
 * 			},
 * 			filepath: string,
 * 		}[];
 * }>}
 */
const components = {
	button: Button,
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

export const prerender = [
	'button',
];