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
	const docs: Docs;
	export default docs;
}

/**
 * Ambient type only used for intellisense, DO NOT USE IN YOUR PROJECT
 * ...I just want want the svelte-check to shut the # up. I'm using it. 😒
 */
declare type ATypedSvelteComponent = {
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$prop_def: any;
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$events_def: any;
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$slot_def: any;

    $on(event: string, handler: (e: any) => any): () => void;
}
/**
 * Ambient type only used for intellisense, DO NOT USE IN YOUR PROJECT
 * ...Shut up. I'm using it. 😒
 */
declare type ConstructorOfATypedComponent = new (args: {target: any, props?: any}) => ATypedSvelteComponent
