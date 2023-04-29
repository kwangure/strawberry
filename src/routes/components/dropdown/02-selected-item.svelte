<script>
    import { Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
</script>

<Dropdown>
	<button slot="trigger">
		Click for dropdown
	</button>
	<Popup>
		<div class="br-list-item">Unselected</div>
		<div class="br-list-item" aria-selected="true">
			Selected
		</div>
		<div class="br-list-item">Unselected</div>
	</Popup>
</Dropdown>
