<script>
    import { Element } from '@kwangure/strawberry/default/element';

    const element = {
    	type: 'p',
    	props: {
    		style: 'font-style: italic; color: red;',
    	},
    	children: ['I am a dynamically generated red <p/> tag element.'],
    };
</script>

<Element {element}/>