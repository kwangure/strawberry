<script>
    import { cpp, css, javascript, mixedHTML, python, rust } from '@kwangure/strawberry/code';

    const languages = /** @type {const} */ ([
    	['HTML', mixedHTML, '<h1>Hello world!</h1>'],
    	['CSS', css, ['.center {',
    		'    display: flex;',
    		'    align-items: center;',
    		'    justify-content: center;',
    		'}'].join('\n')],
    	['JavaScript', javascript, 'const isEven = (i) => i % 2 === 0;'],
    	['Python', python, 'lambda i: (i % 2) == 0'],
    	['C++', cpp, 'bool isEven(int x) { return !(x % 2); }'],
    	['Rust', rust, 'let is_even = |x: i32| x % 2 == 0;'],
    ]);
</script>

{#each languages as [name, highlighter, code]}
    <h3>{name}</h3>
    <code style='padding: 0;'>
        {#each highlighter(code) as { segment, color }}
            {#if color}
                <span style='color: var(--br-code-token-{color}-color);'>{segment}</span>
            {:else}
                {segment}
            {/if}
        {/each}
    </code>
{/each}

