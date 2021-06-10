<script>
    import Code from "~@components/Code";
</script>

<Code language="svelte">
&lt;script&gt
const five &#61; 5&#59;
const six &#61; 6&#59;
const product &#61; five * six&#59;

console&#46;log&#40;&#123; product &#125;&#41&#59;

function shout() &#123;
    console.log("The product of 5 and 6 is ", product);
&#125;
&lt;script/&gt

&lt;button on:click=&#123;shout&#125;&gt;
    Tell me the product.
&lt;/button&gt;

</Code>
