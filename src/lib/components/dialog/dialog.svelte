<!--
	@component

	Dialog presents a dialog box or modal.
-->
<script>
	import { createEventDispatcher } from 'svelte';
	import { createEventForwarder } from '@kwangure/strawberry/utils/events';

	const dispatch = createEventDispatcher();
	const forward = createEventForwarder();
	/**
	 * The data with which to render the modal
	 *
	 * @type {any}
	 */
	export let context = undefined;
	/** @type {'modal' | 'non-modal' | false} */
	export let open = false;

	/**
     * @param {HTMLDialogElement} dialog
     * @param {typeof open} open
     */
	function dialog(dialog, open) {
		let first = true;
		/** @param {string} event */
		function _dispatch(event) {
			if (first) {
				first = false;
				return;
			}
			dispatch(event);
		}

		/** @param {typeof open} open */
		function update(open) {
			if (!open) {
				dialog.close();
				dialog.inert = true;
				_dispatch('close');
				return;
			}

			if (open === 'modal' || open === 'non-modal') {
				dialog.inert = false;

				const focusTarget = /** @type {HTMLInputElement}*/(dialog.querySelector('[autofocus]'));
				if (focusTarget) {
					focusTarget.focus();
				} else {
					dialog.querySelector('button')?.focus();
				}

				if (open === 'modal') {
					dialog.showModal();
				} else {
					dialog.show();
				}
				_dispatch('open');
			}
		}

		update(open);

		return { update };
	}
</script>

<dialog class:modal={open === 'modal'} class:non-modal={open === 'non-modal'}
	aria-hidden={!open} use:dialog={open} use:forward>
	<slot {context} {open}/>
</dialog>

<style>
	:global(html):has(dialog[open].modal) {
		overflow: hidden;
	}
	dialog {
		display: flex;
		flex-direction: column;
		align-items: start;
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
		background-color: var(--br-dark, #222) var(--br-light, #fff);
		color: inherit;
		border: 1px solid transparent;
		padding-block: var(--br-dialog-root-padding-block, 16px);
		padding-inline: var(--br-dialog-root-padding-inline, 24px);
	}
	dialog {
		border-block-start: var(--br-dark, 1px solid #394047);
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
		background-color: var(--br-dark, rgba(50,50,50,0.5)) var(--br-light, rgba(0,0,0,0.5));
		opacity: 1;
	}
	@media (prefers-color-scheme: dark) {
		dialog.modal::backdrop {
			background-color: rgba(50,50,50,0.5);
		}
 	}
	@media (prefers-color-scheme: light) {
		dialog.modal::backdrop {
			background-color: rgba(0,0,0,0.5);
		}
	}
	:global(:root[data-br-color-scheme=dark]) dialog.modal::backdrop {
		background-color: rgba(50,50,50,0.5);
	}
	:global(:root[data-br-color-scheme=light]) dialog.modal::backdrop {
		background-color: rgba(0,0,0,0.5);
	}
	dialog.non-modal::backdrop {
		background-color: transparent;
	}
</style>
