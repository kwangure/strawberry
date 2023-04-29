<script>
    import { Arrow, Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
</script>

<Dropdown>
	<button slot="trigger">
		Click for dropdown
	</button>
	<Popup>
		<Arrow/>
		<div class="br-list-item">Purple</div>
		<div class="br-list-item">Penguin</div>
		<div class="br-list-item">Has</div>
		<div class="br-list-item">Landed</div>
	</Popup>
</Dropdown>
