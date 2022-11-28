<!--
    @component

    Dialog presents a dialog box or modal.
-->
<script>
	import { createEventDispatcher } from 'svelte';
	import { listen } from 'svelte/internal';

	const dispatch = createEventDispatcher();

	/**
	 * The default context to render the unopened modal
	 *
	 * @type {any}
	 */
	export let context = undefined;

	/**
	 * @param {string | undefined} returnValue
	 */
	export function close(returnValue) {
		dialog.close(returnValue);
	}

	/**
	 * When called, the function opens the dialog in non-modal mode
	 * @type {(options: { target?: { value: any }; }) => void}
	 */
	export const show = _show;
	/**
	 * @param {{ target?: { value: any }; }} options
	 */
	function _show(options) {
		isModal = false;
		dialog.showModal();
		handleOpen(options);
	}

	/**
	 * When called, the function opens the dialog in modal mode
	 * @type {(options: { target?: { value: any }; }) => void}
	 */
	export const showModal = _showModal;
	/**
	 * @param {{
	 * 		target?: {
	 * 			value: any;
	 * 		},
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
	let _context = context;
	/**
	 * @type {boolean}
	 */
	let isModal = false;

	/**
	 * @param {string} event
	 */
	function dispatchEvent(event) {
		console.log({ form, formdata: new FormData(form) });
		dispatch(event, {
			returnValue: dialog.returnValue,
			formData: new FormData(form),
		});
	}

	/**
	 * @param {{
	 * 		target?: {
	 * 			value: any
	 * 		}
	 * }} options
	 */
	function handleOpen(options = {}) {
		_context = options.target?.value;
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
			_context = context;
		}

		cleanup(listen(dialog, 'click', (event) => {
			if (isModal) return;
			const isBackdropClick = dialog
				.isSameNode(/** @type {Node} */ (event.target));
			if (!isBackdropClick) return;

			// we want to change dialog state, before we bubble up events
			// We close capture it at the top before anyone receives it
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
		<slot context={_context}/>
	</form>
</dialog>

<style>
	:global(html):has(dialog[open].modal) {
		overflow: hidden;
	}
	dialog {
		display: grid;
		position: fixed;
		max-inline-size: var(--br-dialog-root-max-inline-size);
		max-block-size: var(--br-dialog-root-max-block-size);
		margin: auto;
		inset: 0;
		border-radius: 4px;
		box-shadow: var(--br-dialog-root-box-shadow);
		z-index: 100000;
		overflow: hidden;
		transition: opacity .5s cubic-bezier(.25, 0, .3, 1);
		background-color: var(--br-dialog-root-background-color);
		color: var(--br-dialog-root-font-color);
		border: 1px solid transparent;
		padding-block: var(--br-dialog-root-padding-block, 16px);
		padding-inline: var(--br-dialog-root-padding-inline, 24px);
		grid-template-rows: minmax(0, 1fr);
	}

	@media (prefers-color-scheme: dark) {
		dialog {
			border-block-start: 1px solid #495057;
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
		display: flex;
		flex-direction: column;
		align-items: start;
	}
</style>
