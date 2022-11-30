<script>
	import { Container } from '@kwangure/strawberry/default/input/container';
	import { Postfix } from '@kwangure/strawberry/default/input/number';
	import { validate } from '@kwangure/strawberry/actions/validate.js';
</script>

<Container let:inputId>
	<label for={inputId} slot="label">
		Use the postfix to step through numbers
	</label>
	<input id={inputId} placeholder="3.14"
		required type='number' use:validate/>
	<Postfix/>
</Container>
