import * as render from 'sveltekit-markdoc/renderers';
import path, { dirname } from 'path';
import fs from 'fs';
import Markdoc from '@markdoc/markdoc';

const cwd = process.cwd();
const subPath = 'docs/README_TEMPLATE.md';
const readmeTemplatePath = path.resolve(cwd, subPath);
const readmePath = path.resolve(cwd, 'README.md');
const readmeSource = fs.readFileSync(readmeTemplatePath, 'utf-8');

const ast = Markdoc.parse(readmeSource);
const frontmatter = JSON.parse(ast.attributes.frontmatter || '{}');
const renderableTree = Markdoc.transform(ast, {
	variables: { frontmatter },
	tags: {
		test: {
			transform(node) {
				const { language, src } = node.attributes;
				const attributes = {
					'data-language': language,
				};
				const relative = path
					.relative(dirname(readmeTemplatePath), src);
				const filepath = path.resolve(readmeTemplatePath, relative);
				const children = [fs.readFileSync(filepath, 'utf-8')];
				return new Markdoc.Tag('pre', attributes, children);
			},
		},
	},
});

const markdown = [
	`<!--\n    This document is generated from '${subPath}'. Do not edit it directly.\n-->`,
	// Markdoc wraps the document in <article/>. We don't like that.
	render.markdown(renderableTree.children),
].join('\n');

fs.writeFileSync(readmePath, markdown);
