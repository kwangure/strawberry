<script>
	import { Container } from '@kwangure/strawberry/default/input/container';
	import { Postfix } from '@kwangure/strawberry/default/input/number';
</script>

<Container let:inputId>
	<label for={inputId} slot="label">
		Use the postfix to step through numbers
	</label>
	<input id={inputId} value="3.14" type='number'/>
	<Postfix/>
</Container>
