<script>
	import { Container } from '@kwangure/strawberry/default/input/container';
</script>

<Container let:inputId>
	<label slot='label' for={inputId}>
		This is the input label
	</label>
	<input id={inputId} placeholder="I can say anything!"/>
</Container>

<Container let:inputId>
	<label slot='label' for={inputId}>
		Pick a pizza toping.
	</label>
	<select id={inputId}>
		<option>Pineapple</option>
		<option>Pepperoni</option>
		<option>Peppers</option>
	</select>
</Container>
