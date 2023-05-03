<div class="grid">
	<div class="section light">
		<div class='br-focusable'>Item</div>
		<div class='br-focusable hover' >Item Hover</div>
		<div class='br-focusable' aria-selected="true">Item Selected</div>
		<div class='br-focusable hover' aria-selected="true">Item Selected Hover</div>
	</div>
	<div class="section light layer">
		<div class='br-focusable'>Item</div>
		<div class='br-focusable hover' >Item Hover</div>
		<div class='br-focusable' aria-selected="true">Item Selected</div>
		<div class='br-focusable hover' aria-selected="true">Item Selected Hover</div>
	</div>
	<div class="section dark">
		<div class='br-focusable'>Item</div>
		<div class='br-focusable hover' >Item Hover</div>
		<div class='br-focusable' aria-selected="true">Item Selected</div>
		<div class='br-focusable hover' aria-selected="true">Item Selected Hover</div>
	</div>
	<div class="section dark layer">
		<div class='br-focusable'>Item</div>
		<div class='br-focusable hover' >Item Hover</div>
		<div class='br-focusable' aria-selected="true">Item Selected</div>
		<div class='br-focusable hover' aria-selected="true">Item Selected Hover</div>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.section {
		padding-inline: var(--br-size-4);
		padding-block: var(--br-size-4);
	}
	.dark {
		--br-light: ;
		--br-dark: initial;
		background-color: #222;
		color: #fff;
	}
	.dark.layer {
		background-color: #2d2d2d;
	}
	.light {
		--br-dark: ;
		--br-light: initial;
		background-color: #fff;
		color: #222;
	}
</style>