import { code } from 'sveltekit-markdoc/tags';
import fs from 'fs';
import Markdoc from '@markdoc/markdoc';
import { markdown } from 'sveltekit-markdoc/renderers';
import { mergeInto } from '../src/lib/utils/object.js';
import path from 'path';
import sharedMarkdocConfig from '../markdoc.config.js';

const cwd = process.cwd();
const subPath = 'docs/README_TEMPLATE.md';
const readmeTemplatePath = path.resolve(cwd, subPath);
const readmePath = path.resolve(cwd, 'README.md');
const readmeSource = fs.readFileSync(readmeTemplatePath, 'utf-8');

const ast = Markdoc.parse(readmeSource);
const frontmatter = JSON.parse(ast.attributes.frontmatter || '{}');
const renderableTree = Markdoc.transform(ast, mergeInto({
	variables: { frontmatter },
	meta: { id: readmeTemplatePath },
	tags: { code },
}, sharedMarkdocConfig));

fs.writeFileSync(readmePath, [
	`<!--\n    This document is generated from '${subPath}'. Do not edit it directly.\n-->`,
	// Markdoc wraps the document in <article/>. We don't like that.
	markdown(renderableTree),
].join('\n'));
