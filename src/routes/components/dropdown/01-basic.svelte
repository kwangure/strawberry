<script>
    import { Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
</script>

<Dropdown>
	<button slot="trigger">
		Click for dropdown
	</button>
	<Popup>
		<div class="br-focusable">Purple</div>
		<div class="br-focusable">Penguin</div>
		<div class="br-focusable">Has</div>
		<div class="br-focusable">Landed</div>
	</Popup>
</Dropdown>
