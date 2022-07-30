<script>
	import { createEventDispatcher } from 'svelte';
	import { listen } from 'svelte/internal';

	const dispatch = createEventDispatcher();

	/**
	 * When called, the function opens the dialog in non-modal mode
	 * @type {(options: { value: any; }) => void}
	 */
	export const show = _show;
	/**
	 * @param {{ value: any; }} options
	 */
	function _show(options) {
		isModal = false;
		dialog.showModal();
		handleOpen(options);
	}

	/**
	 * When called, the function opens the dialog in modal mode
	 * @type {(options: { value: any; }) => void}
	 */
	export const showModal = _showModal;
	/**
	 * @param {{
	 * 		value?: any;
	 * }} options
	 */
	function _showModal(options) {
		isModal = true;
		dialog.showModal();
		handleOpen(options);
	}

	/**
	 * @type {HTMLDialogElement}
	 */
	let dialog;
	/**
	 * @type {HTMLFormElement}
	 */
	let form;

	/**
	 * @type {any}
	 */
	let context;
	/**
	 * @type {boolean}
	 */
	let isModal = false;

	/**
	 * @param {string} event
	 */
	function dispatchEvent(event) {
		dispatch(event, {
			returnValue: dialog.returnValue,
			formData: new FormData(form),
		});
	}

	/**
	 * @param {{
	 * 		value?: any
	 * }} options
	 */
	function handleOpen(options = {}) {
		context = options.value;
		dialog.removeAttribute('inert');

		const focusTarget = /** @type {HTMLInputElement}*/(dialog.querySelector('[autofocus]'));
		if (focusTarget) {
			focusTarget.focus();
		} else {
			dialog.querySelector('button')?.focus();
		}

		dispatchEvent('open');
	}

	/**
	 * @param {HTMLDialogElement} dialog
	 */
	function enhance(dialog) {
		/** @type {Function[]} */
		const cleanupQueue = [];
		const cleanup = Array.prototype.push.bind(cleanupQueue);

		const form = /** @type {HTMLFormElement}*/(dialog.firstElementChild);
		/**
		 * @param {string} event
		 */
		function dispatchEvent(event) {
			dispatch(event, {
				returnValue: dialog.returnValue,
				formData: new FormData(form),
			});
		}

		/**
		 * @param {string} value
		 */
		function closeDialog(value) {
			dialog.close(value);
			form.reset();
		}

		cleanup(listen(dialog, 'click', (event) => {
			if (isModal) return;
			const isBackdropClick = dialog
				.isSameNode(/** @type {Node} */ (event.target));
			if (!isBackdropClick) return;

			listen(document, 'close', (event) => {
				event.stopPropagation();
			}, { once: true, capture: true });
			closeDialog('');
			dispatchEvent('cancel');
			dispatchEvent('close');

		}));

		cleanup(listen(dialog, 'close', () => {
			dispatchEvent('close');
		}));

		return {
			destroy() {
				while (cleanupQueue.length) cleanupQueue.pop()?.();
			},
		};
	}
</script>

<dialog bind:this={dialog} inert class:modal={isModal} use:enhance
	class:non-modal={!isModal}>
	<form method="dialog" bind:this={form}>
		<slot name='header' {context}/>
		<slot name='content' {context}/>
		<slot name='footer' {context}/>
	</form>
</dialog>

<style>
	:global(html):has(dialog[open].modal) {
		overflow: hidden;
	}

	:host,
	:root {
		--br-dialog-root-padding-block: 8px;
		--br-dialog-root-padding-inline: 12px;
		--br-dialog-root-box-shadow: 0 2px 8px #111;
	}

	dialog {
		display: grid;
		position: fixed;
		max-inline-size: min(90vw, 60ch);
		max-block-size: min(80vh, 100%);
		max-block-size: min(80dvb, 100%);
		margin: auto;
		padding-block: var(--br-dialog-root-padding-block);
		padding-inline: var(--br-dialog-root-padding-inline);
		inset: 0;
		border-radius: 4px;
		box-shadow: var(--br-dialog-root-box-shadow);
		z-index: var(--layer-important);
		overflow: hidden;
		transition: opacity .5s cubic-bezier(.25, 0, .3, 1);
		background-color: var(--br-dialog-root-background-color);
		color: var(--br-dialog-root-font-color);
		border: 1px solid transparent;
	}

	@media (prefers-color-scheme: dark) {
		dialog {
			border-block-start: 1px solid #495057;
		}
		:host,
		:root {
			--br-dialog-root-background-color: #343a40;
			--br-dialog-root-font-color: #f1f3f5;
		}
		::backdrop {
			--br-dialog-backdrop-background-color: rgba(50,50,50,0.5);
		}
	}
	@media (prefers-color-scheme: light) {
		:host,
		:root {
			--br-dialog-root-background-color: #e9ecef;
			--br-dialog-root-font-color: #212529;
		}
		::backdrop {
			--br-dialog-backdrop-background-color: rgba(0,0,0,0.5);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		dialog {
			animation: slide-out-down .5s cubic-bezier(.25, 0, .3, 1) forwards;
			animation-timing-function: cubic-bezier(.5, -.5, .1, 1.5);
		}
	}

	@media (max-width: 768px) {
		dialog.modal {
			margin-block-end: 0;
			border-end-end-radius: 0;
			border-end-start-radius: 0;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		dialog.modal {
			animation: slide-out-down .5s cubic-bezier(.25, 0, .3, 1) forwards;
			animation-timing-function: cubic-bezier(.5, -.5, .1, 1.5);
		}
		dialog[open] {
			animation: slide-in-up .5s cubic-bezier(.25, 0, .3, 1) forwards;
		}
	}

	@keyframes slide-out-down {
		to { transform: translateY(100%) }
	}

	@keyframes slide-in-up {
		from { transform: translateY(100%) }
	}

	dialog:not([open]) {
		pointer-events: none;
		opacity: 0;
	}

	dialog::backdrop {
		transition: background-color 0.25s ease;
	}
	dialog.modal::backdrop {
        background-color: var(--br-dialog-backdrop-background-color);
		opacity: 1;
	}
	dialog.non-modal::backdrop {
        background-color: transparent;
	}

	form {
		display: grid;
		grid-template-rows: auto 1fr auto;
		align-items: start;
		max-block-size: 80vh;
		max-block-size: 80dvb;
	}
</style>
