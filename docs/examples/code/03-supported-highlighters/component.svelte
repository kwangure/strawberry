<script>
    import { Code, cpp, css, javascript, mixedHTML, python, rust } from '@kwangure/strawberry/default/code';
</script>

<h3>HTML</h3>
<Code highlight={mixedHTML} code={'<h1>Hello world!</h1>\nI\'m <em>NOT</em> a wizard.'}/>

<h3>CSS</h3>
<Code highlight={css} code={`.center {
    display: flex;
    align-items: center;
    justify-content: center;
}`}/>

<h3>JavaScript</h3>
<Code highlight={javascript} code={`function isEven( i ) {
    return i % 2 === 0;
  }`}/>

<h3>Python</h3>
<Code highlight={python} code={`def is_even(i):
    return (i % 2) == 0`}/>

<h3>C++</h3>
<Code highlight={cpp} code={`bool isEven(int x)
{
    return !(x % 2);
}`}/>

<h3>Rust</h3>
<Code highlight={rust} code={'let is_even = |x: i32| x % 2 == 0;'}/>
