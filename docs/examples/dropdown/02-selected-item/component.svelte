<script>
    import { Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
</script>

<Dropdown>
	<button slot="trigger">
		Click for dropdown
	</button>
	<Popup>
		<div class="br-dropdown-item">Unselected</div>
		<div class="br-dropdown-item" aria-selected="true">
			Selected
		</div>
		<div class="br-dropdown-item">Unselected</div>
	</Popup>
</Dropdown>
