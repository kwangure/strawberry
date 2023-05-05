interface Docs {
	name: string;
	description: string;
	customProperties: {
		customProperty: string;
		value?: string;
	}[];
	workingDirectoryFilepath: string;
	examples: {
		code: string,
		readme: {
			frontmatter: MarkdocImport['frontmatter'],
			tree: MarkdocImport['tree'],
		},
		filepath: string,
	}[];
}