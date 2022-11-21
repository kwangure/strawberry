import * as render from 'sveltekit-markdoc/renderers';
import fs from 'fs';
import Markdoc from '@markdoc/markdoc';
import path from 'path';

const cwd = process.cwd();
const subPath = 'docs/README_TEMPLATE.md';
const readmeTemplatePath = path.resolve(cwd, subPath);
const readmePath = path.resolve(cwd, 'README.md');
const readmeSource = fs.readFileSync(readmeTemplatePath, 'utf-8');

const ast = Markdoc.parse(readmeSource);
const frontmatter = JSON.parse(ast.attributes.frontmatter || '{}');
const renderableTree = Markdoc.transform(ast, { variables: { frontmatter }});

const markdown = [
	`<!--\n    This document is generated from '${subPath}'. Do not edit it directly.\n-->`,
	// Markdoc wraps the document in <article/>. We don't like that.
	render.markdown(renderableTree.children),
].join('\n');

fs.writeFileSync(readmePath, markdown);
