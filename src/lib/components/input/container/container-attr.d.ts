declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        // If you want to use on:beforeinstallprompt
        onvalidate?: (event: any) => any;
    }
}