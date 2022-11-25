/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare module "*:docs" {
	const docs: {
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
	};
	export default docs;
}
