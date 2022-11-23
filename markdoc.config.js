import Markdoc from '@markdoc/markdoc';

/** @type {import('@markdoc/markdoc').Config} */
const config = {
	nodes: {
		// Markdoc wraps the document in <article/>. We don't like that.
		document: {
			...Markdoc.nodes.document,
			render: '', // instead of 'article'
		},
	},
};

export default config;
