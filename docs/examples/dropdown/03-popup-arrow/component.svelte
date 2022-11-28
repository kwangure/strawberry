<script>
    import { Arrow, Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
</script>

<Dropdown>
	<button slot="trigger">
		Click for dropdown
	</button>
	<Popup>
		<Arrow/>
		<div class="br-dropdown-item">Purple</div>
		<div class="br-dropdown-item">Penguin</div>
		<div class="br-dropdown-item">Has</div>
		<div class="br-dropdown-item">Landed</div>
	</Popup>
</Dropdown>
