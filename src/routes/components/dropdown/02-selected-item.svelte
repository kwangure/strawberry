<script>
    import { Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
</script>

<Dropdown>
	<button slot="trigger">
		Click for dropdown
	</button>
	<Popup>
		<div class="br-focusable">Unselected</div>
		<div class="br-focusable" aria-selected="true">
			Selected
		</div>
		<div class="br-focusable">Unselected</div>
	</Popup>
</Dropdown>
